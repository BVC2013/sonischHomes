# Sonisch Homes

A modern real estate website with live MLS data integration, built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **Live MLS Listings** – Pulls real property data from the SimplyRETS MLS API
- **Tabbed Navigation** – Browse listings by category:
  - For Sale (residential properties)
  - Rentals (apartments, townhomes, houses for rent)
  - Luxury (properties over $1M)
  - Commercial (office, retail, industrial, mixed-use)
  - Land (lots and acreage)
- **Search** – Filter listings by city, neighborhood, or zip code
- **Property Cards** – At-a-glance view with price, address, beds/baths/sqft, and days on market
- **Detail Modal** – Full property details including photo gallery, description, HOA info, and agent contact
- **Graceful Fallback** – Curated demo listings are shown when the live MLS API is unavailable
- **Responsive Design** – Works beautifully on mobile, tablet, and desktop

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## MLS API

This project integrates with the [SimplyRETS API](https://simplyrets.com/) to fetch live MLS data.

**Endpoint:** `GET /api/listings`

| Parameter   | Description                                 | Example          |
|-------------|---------------------------------------------|------------------|
| `type`      | Listing category                            | `residential`, `rental`, `commercial`, `land`, `luxury` |
| `minprice`  | Minimum list price                          | `500000`         |
| `maxprice`  | Maximum list price                          | `1000000`        |
| `limit`     | Number of results (default: 12)             | `24`             |
| `q`         | Text search query                           | `Houston`        |

**Example:**
```
GET /api/listings?type=luxury&limit=6
GET /api/listings?type=residential&q=Katy
GET /api/listings?type=rental&maxprice=2000
```

The API uses demo credentials (`simplyrets:simplyrets`) for the SimplyRETS demo dataset.
For production use, replace with your own MLS credentials in `app/api/listings/route.ts`.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **MLS Provider:** [SimplyRETS](https://simplyrets.com/) (RESO/MLS standard API)

## Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |
