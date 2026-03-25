import { NextRequest } from "next/server";
import { getMockListings } from "../../lib/mockListings";

const SIMPLYRETS_API = "https://api.simplyrets.com/properties";
const SIMPLYRETS_AUTH = Buffer.from("simplyrets:simplyrets").toString("base64");

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type") || "residential";
  const minprice = searchParams.get("minprice");
  const maxprice = searchParams.get("maxprice");
  const limit = searchParams.get("limit") || "12";
  const q = searchParams.get("q");

  const params = new URLSearchParams();
  params.set("type", type === "luxury" ? "residential" : type);
  params.set("limit", limit);
  params.set("status", "Active");

  if (minprice) params.set("minprice", minprice);
  if (maxprice) params.set("maxprice", maxprice);
  if (type === "luxury" && !minprice) params.set("minprice", "1000000");
  if (q) params.set("q", q);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(`${SIMPLYRETS_API}?${params.toString()}`, {
      headers: {
        Authorization: `Basic ${SIMPLYRETS_AUTH}`,
        Accept: "application/json",
      },
      next: { revalidate: 300 },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`MLS API returned ${response.status}`);
    }

    const listings = await response.json();
    return Response.json(Array.isArray(listings) ? listings : []);
  } catch {
    // Fall back to curated demo listings when the live MLS API is unavailable
    const mockData = getMockListings(
      type,
      minprice ? Number(minprice) : undefined,
      maxprice ? Number(maxprice) : undefined,
      q ?? undefined
    );
    return Response.json(mockData);
  }
}

