const SIMPLYRETS_API = 'https://api.simplyrets.com/properties'
const SIMPLYRETS_AUTH = Buffer.from(
  `${process.env.SIMPLYRETS_USER || 'simplyrets'}:${process.env.SIMPLYRETS_PASS || 'simplyrets'}`
).toString('base64')

const BASE_PHOTOS = {
  residential: [
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    'https://images.unsplash.com/photo-1549517045-bc93de9c4f42?w=800&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
    'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80',
  ],
  rental: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  ],
  luxury: [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  ],
  commercial: [
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
  ],
  land: [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
  ],
}

const AGENTS = [
  { firstName: 'Sarah', lastName: 'Thompson', contact: { email: 'sarah.thompson@sonischhomes.com', office: '(713) 555-0142', cell: '(713) 555-0142' }, office: { name: 'Sonisch Homes Realty', contact: { email: null, office: '(713) 555-0142' } } },
  { firstName: 'Michael', lastName: 'Rivera', contact: { email: 'michael.rivera@sonischhomes.com', office: '(713) 555-0187', cell: '(713) 555-0187' }, office: { name: 'Sonisch Homes Realty', contact: { email: null, office: '(713) 555-0187' } } },
  { firstName: 'Jennifer', lastName: 'Walsh', contact: { email: 'jennifer.walsh@sonischhomes.com', office: '(713) 555-0203', cell: '(713) 555-0203' }, office: { name: 'Sonisch Homes Realty', contact: { email: null, office: '(713) 555-0203' } } },
]

function pick(arr, i) { return arr[i % arr.length] }
function pickPhotos(type, count = 4) {
  const photos = BASE_PHOTOS[type] || BASE_PHOTOS.residential
  return Array.from({ length: Math.min(count, photos.length) }, (_, i) => photos[i])
}

const MOCK_LISTINGS = {
  residential: [
    { mlsId: 'R001', listPrice: 425000, property: { bedrooms: 4, bathsFull: 2, bathsHalf: 1, area: 2380, type: 'residential', subType: null, stories: 2, style: 'Traditional', yearBuilt: 2005 }, address: { full: '3214 Elmwood Dr, Houston, TX 77018', city: 'Houston', state: 'TX', postalCode: '77018', streetNumber: '3214', streetName: 'Elmwood Dr', unit: null }, agent: AGENTS[0], office: AGENTS[0].office, photos: pickPhotos('residential', 4), listDate: '2024-01-10', modificationTimestamp: '2024-01-20', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Stunning traditional home in the heart of Houston. Features an open-concept kitchen with granite countertops, hardwood floors throughout, and a spacious backyard perfect for entertaining.', geo: { lat: 29.8, lng: -95.4, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'Houston Heights', daysOnMarket: 12, originalEntryTimestamp: '2024-01-10', originatingSystemName: 'HAR' } },
    { mlsId: 'R002', listPrice: 289000, property: { bedrooms: 3, bathsFull: 2, bathsHalf: 0, area: 1650, type: 'residential', subType: null, stories: 1, style: 'Ranch', yearBuilt: 1998 }, address: { full: '8821 Meadowbrook Ln, Katy, TX 77450', city: 'Katy', state: 'TX', postalCode: '77450', streetNumber: '8821', streetName: 'Meadowbrook Ln', unit: null }, agent: AGENTS[1], office: AGENTS[1].office, photos: pickPhotos('residential', 3), listDate: '2024-01-15', modificationTimestamp: '2024-01-22', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Charming ranch-style home on a quiet cul-de-sac. New roof installed in 2022, updated HVAC, and fresh paint throughout. Large backyard with mature oak trees.', geo: { lat: 29.78, lng: -95.82, county: 'Harris' }, association: { fee: 65, name: 'Meadowbrook HOA', amenities: 'Pool, Park' }, mls: { status: 'Active', area: 'Katy', daysOnMarket: 5, originalEntryTimestamp: '2024-01-15', originatingSystemName: 'HAR' } },
    { mlsId: 'R003', listPrice: 567000, property: { bedrooms: 5, bathsFull: 3, bathsHalf: 1, area: 3200, type: 'residential', subType: null, stories: 2, style: 'Colonial', yearBuilt: 2012 }, address: { full: '1505 Stratford Pl, Sugar Land, TX 77479', city: 'Sugar Land', state: 'TX', postalCode: '77479', streetNumber: '1505', streetName: 'Stratford Pl', unit: null }, agent: AGENTS[2], office: AGENTS[2].office, photos: pickPhotos('residential', 5), listDate: '2024-01-05', modificationTimestamp: '2024-01-18', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Elegant colonial in sought-after Sugar Land. Gourmet kitchen with double ovens, formal dining room, and a grand staircase entry. Primary suite features a spa-like bathroom with soaking tub.', geo: { lat: 29.62, lng: -95.64, county: 'Fort Bend' }, association: { fee: 120, name: 'Stratford Manor HOA', amenities: 'Pool, Tennis, Clubhouse' }, mls: { status: 'Active', area: 'Sugar Land', daysOnMarket: 20, originalEntryTimestamp: '2024-01-05', originatingSystemName: 'HAR' } },
    { mlsId: 'R004', listPrice: 199000, property: { bedrooms: 3, bathsFull: 2, bathsHalf: 0, area: 1420, type: 'residential', subType: null, stories: 1, style: 'Bungalow', yearBuilt: 1975 }, address: { full: '720 Oak Street, Pasadena, TX 77502', city: 'Pasadena', state: 'TX', postalCode: '77502', streetNumber: '720', streetName: 'Oak Street', unit: null }, agent: AGENTS[0], office: AGENTS[0].office, photos: pickPhotos('residential', 3), listDate: '2024-01-20', modificationTimestamp: '2024-01-25', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Classic bungalow with great bones. Updated kitchen with stainless appliances, new windows, and freshly refinished hardwood floors. Large lot with plenty of room to expand.', geo: { lat: 29.69, lng: -95.21, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'Pasadena', daysOnMarket: 0, originalEntryTimestamp: '2024-01-20', originatingSystemName: 'HAR' } },
    { mlsId: 'R005', listPrice: 345000, property: { bedrooms: 4, bathsFull: 2, bathsHalf: 1, area: 2100, type: 'residential', subType: null, stories: 2, style: 'Craftsman', yearBuilt: 2008 }, address: { full: '2244 Blossom Ave, The Woodlands, TX 77380', city: 'The Woodlands', state: 'TX', postalCode: '77380', streetNumber: '2244', streetName: 'Blossom Ave', unit: null }, agent: AGENTS[1], office: AGENTS[1].office, photos: pickPhotos('residential', 4), listDate: '2024-01-12', modificationTimestamp: '2024-01-19', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Beautiful Craftsman home in The Woodlands with designer touches throughout. Custom millwork, vaulted ceilings, and a chef\'s kitchen. Walking distance to Town Center shops and restaurants.', geo: { lat: 30.17, lng: -95.47, county: 'Montgomery' }, association: { fee: 95, name: 'Woodlands HOA', amenities: 'Trails, Parks, Pools' }, mls: { status: 'Active', area: 'The Woodlands', daysOnMarket: 8, originalEntryTimestamp: '2024-01-12', originatingSystemName: 'HAR' } },
    { mlsId: 'R006', listPrice: 478000, property: { bedrooms: 4, bathsFull: 3, bathsHalf: 0, area: 2750, type: 'residential', subType: null, stories: 2, style: 'Contemporary', yearBuilt: 2019 }, address: { full: '9901 Riverstone Blvd, Missouri City, TX 77459', city: 'Missouri City', state: 'TX', postalCode: '77459', streetNumber: '9901', streetName: 'Riverstone Blvd', unit: null }, agent: AGENTS[2], office: AGENTS[2].office, photos: pickPhotos('residential', 4), listDate: '2024-01-08', modificationTimestamp: '2024-01-21', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Stunning contemporary home built in 2019 with every upgrade. Open floorplan, quartz countertops, smart home technology, 3-car garage, and a resort-style pool.', geo: { lat: 29.55, lng: -95.54, county: 'Fort Bend' }, association: { fee: 150, name: 'Riverstone Community', amenities: 'Fitness Center, Pool, Lake' }, mls: { status: 'Active', area: 'Missouri City', daysOnMarket: 17, originalEntryTimestamp: '2024-01-08', originatingSystemName: 'HAR' } },
  ],
  rental: [
    { mlsId: 'RN001', listPrice: 1850, property: { bedrooms: 2, bathsFull: 2, bathsHalf: 0, area: 1100, type: 'rental', subType: 'Apartment', stories: 1, style: 'Modern', yearBuilt: 2018 }, address: { full: '400 Main St #312, Houston, TX 77002', city: 'Houston', state: 'TX', postalCode: '77002', streetNumber: '400', streetName: 'Main St', unit: '312' }, agent: AGENTS[0], office: AGENTS[0].office, photos: pickPhotos('rental', 4), listDate: '2024-01-18', modificationTimestamp: '2024-01-24', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Modern downtown apartment with city views. Features floor-to-ceiling windows, in-unit washer/dryer, and a sleek kitchen with quartz countertops. Building amenities include rooftop pool and fitness center.', geo: { lat: 29.75, lng: -95.37, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'Downtown Houston', daysOnMarket: 3, originalEntryTimestamp: '2024-01-18', originatingSystemName: 'HAR' } },
    { mlsId: 'RN002', listPrice: 1350, property: { bedrooms: 1, bathsFull: 1, bathsHalf: 0, area: 750, type: 'rental', subType: 'Apartment', stories: 1, style: 'Traditional', yearBuilt: 2010 }, address: { full: '5500 Kirby Dr #205, Houston, TX 77005', city: 'Houston', state: 'TX', postalCode: '77005', streetNumber: '5500', streetName: 'Kirby Dr', unit: '205' }, agent: AGENTS[1], office: AGENTS[1].office, photos: pickPhotos('rental', 3), listDate: '2024-01-16', modificationTimestamp: '2024-01-22', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Cozy one-bedroom in the heart of the Museum District. Walk to Hermann Park, Rice University, and Texas Medical Center. Updated kitchen, large closets, and a private balcony.', geo: { lat: 29.72, lng: -95.42, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'Museum District', daysOnMarket: 6, originalEntryTimestamp: '2024-01-16', originatingSystemName: 'HAR' } },
    { mlsId: 'RN003', listPrice: 2400, property: { bedrooms: 3, bathsFull: 2, bathsHalf: 1, area: 1800, type: 'rental', subType: 'Townhouse', stories: 2, style: 'Modern', yearBuilt: 2015 }, address: { full: '1220 Westheimer Rd, Houston, TX 77006', city: 'Houston', state: 'TX', postalCode: '77006', streetNumber: '1220', streetName: 'Westheimer Rd', unit: null }, agent: AGENTS[2], office: AGENTS[2].office, photos: pickPhotos('rental', 4), listDate: '2024-01-14', modificationTimestamp: '2024-01-20', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Spacious townhouse in Montrose with private garage. Chef\'s kitchen, rooftop deck, and high-end finishes throughout. Walking distance to top restaurants, bars, and boutiques.', geo: { lat: 29.74, lng: -95.40, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'Montrose', daysOnMarket: 1, originalEntryTimestamp: '2024-01-14', originatingSystemName: 'HAR' } },
    { mlsId: 'RN004', listPrice: 1100, property: { bedrooms: 2, bathsFull: 1, bathsHalf: 0, area: 900, type: 'rental', subType: 'Apartment', stories: 1, style: 'Contemporary', yearBuilt: 2005 }, address: { full: '3300 Westpark Dr #118, Houston, TX 77005', city: 'Houston', state: 'TX', postalCode: '77005', streetNumber: '3300', streetName: 'Westpark Dr', unit: '118' }, agent: AGENTS[0], office: AGENTS[0].office, photos: pickPhotos('rental', 3), listDate: '2024-01-22', modificationTimestamp: '2024-01-25', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Affordable two-bedroom near the Galleria. Gated community with pool and fitness center. Easy freeway access and close to top shopping and dining. Pet-friendly.', geo: { lat: 29.72, lng: -95.46, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'Galleria', daysOnMarket: 0, originalEntryTimestamp: '2024-01-22', originatingSystemName: 'HAR' } },
  ],
  luxury: [
    { mlsId: 'L001', listPrice: 2750000, property: { bedrooms: 5, bathsFull: 5, bathsHalf: 2, area: 6800, type: 'residential', subType: null, stories: 3, style: 'Mediterranean', yearBuilt: 2017 }, address: { full: '4400 River Oaks Blvd, Houston, TX 77019', city: 'Houston', state: 'TX', postalCode: '77019', streetNumber: '4400', streetName: 'River Oaks Blvd', unit: null }, agent: AGENTS[2], office: AGENTS[2].office, photos: pickPhotos('luxury', 5), listDate: '2024-01-06', modificationTimestamp: '2024-01-18', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Exceptional Mediterranean estate in the prestigious River Oaks neighborhood. Sweeping foyer with 24-foot ceilings, chef\'s kitchen with La Cornue range, wine cellar, home theater, and resort-style pool with waterfall feature.', geo: { lat: 29.75, lng: -95.43, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'River Oaks', daysOnMarket: 28, originalEntryTimestamp: '2024-01-06', originatingSystemName: 'HAR' } },
    { mlsId: 'L002', listPrice: 1475000, property: { bedrooms: 4, bathsFull: 4, bathsHalf: 1, area: 4200, type: 'residential', subType: null, stories: 2, style: 'Contemporary', yearBuilt: 2021 }, address: { full: '820 Stanford St, Houston, TX 77019', city: 'Houston', state: 'TX', postalCode: '77019', streetNumber: '820', streetName: 'Stanford St', unit: null }, agent: AGENTS[0], office: AGENTS[0].office, photos: pickPhotos('luxury', 4), listDate: '2024-01-10', modificationTimestamp: '2024-01-22', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Newly built contemporary masterpiece in Tanglewood. Clean lines, floor-to-ceiling windows, floating staircase, smart home automation, and an indoor-outdoor living concept with a stunning pool.', geo: { lat: 29.74, lng: -95.47, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'Tanglewood', daysOnMarket: 15, originalEntryTimestamp: '2024-01-10', originatingSystemName: 'HAR' } },
    { mlsId: 'L003', listPrice: 3900000, property: { bedrooms: 6, bathsFull: 6, bathsHalf: 2, area: 8500, type: 'residential', subType: null, stories: 3, style: 'French Country', yearBuilt: 2014 }, address: { full: '2601 Lazy Lane Blvd, Houston, TX 77019', city: 'Houston', state: 'TX', postalCode: '77019', streetNumber: '2601', streetName: 'Lazy Lane Blvd', unit: null }, agent: AGENTS[1], office: AGENTS[1].office, photos: pickPhotos('luxury', 4), listDate: '2024-01-02', modificationTimestamp: '2024-01-16', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Grand French Country estate on a premier corner lot. Features a professional kitchen, formal living and dining, private study, game room, home gym, 4-car garage, and impeccable landscaping.', geo: { lat: 29.76, lng: -95.44, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'River Oaks', daysOnMarket: 42, originalEntryTimestamp: '2024-01-02', originatingSystemName: 'HAR' } },
    { mlsId: 'L004', listPrice: 1250000, property: { bedrooms: 4, bathsFull: 3, bathsHalf: 1, area: 3800, type: 'residential', subType: null, stories: 2, style: 'Modern', yearBuilt: 2020 }, address: { full: '5150 Imlay St, Houston, TX 77007', city: 'Houston', state: 'TX', postalCode: '77007', streetNumber: '5150', streetName: 'Imlay St', unit: null }, agent: AGENTS[2], office: AGENTS[2].office, photos: pickPhotos('luxury', 3), listDate: '2024-01-14', modificationTimestamp: '2024-01-23', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Sleek modern home in the Heights with rooftop terrace and downtown skyline views. Custom cabinetry, Thermador appliances, glass wine room, and a spa-like primary suite with soaking tub.', geo: { lat: 29.77, lng: -95.41, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'Houston Heights', daysOnMarket: 11, originalEntryTimestamp: '2024-01-14', originatingSystemName: 'HAR' } },
  ],
  commercial: [
    { mlsId: 'C001', listPrice: 875000, property: { bedrooms: 0, bathsFull: 2, bathsHalf: 0, area: 4500, type: 'commercial', subType: 'Office', stories: 2, style: 'Office Building', yearBuilt: 2000 }, address: { full: '1200 Post Oak Blvd, Houston, TX 77056', city: 'Houston', state: 'TX', postalCode: '77056', streetNumber: '1200', streetName: 'Post Oak Blvd', unit: null }, agent: AGENTS[0], office: AGENTS[0].office, photos: pickPhotos('commercial', 3), listDate: '2024-01-08', modificationTimestamp: '2024-01-20', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Professional office building in the Galleria area. Two floors with flexible floor plans, ample parking, and excellent visibility. Ideal for medical, legal, or financial services.', geo: { lat: 29.74, lng: -95.46, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'Galleria', daysOnMarket: 32, originalEntryTimestamp: '2024-01-08', originatingSystemName: 'HAR' } },
    { mlsId: 'C002', listPrice: 1200000, property: { bedrooms: 0, bathsFull: 4, bathsHalf: 2, area: 8000, type: 'commercial', subType: 'Retail', stories: 1, style: 'Retail Strip', yearBuilt: 2008 }, address: { full: '6600 Southwest Fwy, Houston, TX 77074', city: 'Houston', state: 'TX', postalCode: '77074', streetNumber: '6600', streetName: 'Southwest Fwy', unit: null }, agent: AGENTS[1], office: AGENTS[1].office, photos: pickPhotos('commercial', 3), listDate: '2024-01-05', modificationTimestamp: '2024-01-17', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'High-traffic retail strip center with 8 tenant spaces. Current occupancy 85%. NNN leases in place. Excellent freeway frontage and easy access. Ideal value-add investment opportunity.', geo: { lat: 29.70, lng: -95.50, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'Southwest Houston', daysOnMarket: 45, originalEntryTimestamp: '2024-01-05', originatingSystemName: 'HAR' } },
    { mlsId: 'C003', listPrice: 550000, property: { bedrooms: 0, bathsFull: 1, bathsHalf: 1, area: 3200, type: 'commercial', subType: 'Mixed Use', stories: 2, style: 'Mixed Use', yearBuilt: 1995 }, address: { full: '2100 Washington Ave, Houston, TX 77007', city: 'Houston', state: 'TX', postalCode: '77007', streetNumber: '2100', streetName: 'Washington Ave', unit: null }, agent: AGENTS[2], office: AGENTS[2].office, photos: pickPhotos('commercial', 3), listDate: '2024-01-11', modificationTimestamp: '2024-01-21', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Mixed-use building on the booming Washington Avenue corridor. Street-level retail with residential unit above. Ideal for a boutique business owner looking for live/work space or an investor seeking rental income.', geo: { lat: 29.76, lng: -95.40, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'Washington Avenue', daysOnMarket: 19, originalEntryTimestamp: '2024-01-11', originatingSystemName: 'HAR' } },
  ],
  land: [
    { mlsId: 'LD001', listPrice: 285000, property: { bedrooms: 0, bathsFull: 0, bathsHalf: 0, area: 43560, type: 'land', subType: 'Residential Lot', stories: 0, style: 'Vacant Land', yearBuilt: 0 }, address: { full: '0 Kingsley Dr, Pearland, TX 77584', city: 'Pearland', state: 'TX', postalCode: '77584', streetNumber: '0', streetName: 'Kingsley Dr', unit: null }, agent: AGENTS[0], office: AGENTS[0].office, photos: pickPhotos('land', 3), listDate: '2024-01-09', modificationTimestamp: '2024-01-19', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Premium 1-acre residential lot in growing Pearland. Utilities at the street. Deed restrictions allow custom home construction. Convenient to Highway 288 and Beltway 8. Pearland ISD.', geo: { lat: 29.56, lng: -95.29, county: 'Brazoria' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'Pearland', daysOnMarket: 21, originalEntryTimestamp: '2024-01-09', originatingSystemName: 'HAR' } },
    { mlsId: 'LD002', listPrice: 680000, property: { bedrooms: 0, bathsFull: 0, bathsHalf: 0, area: 130680, type: 'land', subType: 'Commercial Lot', stories: 0, style: 'Vacant Land', yearBuilt: 0 }, address: { full: '0 W. Bellfort Ave, Houston, TX 77083', city: 'Houston', state: 'TX', postalCode: '77083', streetNumber: '0', streetName: 'W. Bellfort Ave', unit: null }, agent: AGENTS[1], office: AGENTS[1].office, photos: pickPhotos('land', 3), listDate: '2024-01-04', modificationTimestamp: '2024-01-15', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: '3-acre commercial tract on a major thoroughfare with 200 feet of road frontage. Zoned for retail, office, or light industrial. Growing area with substantial rooftop count nearby.', geo: { lat: 29.68, lng: -95.57, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'Southwest Houston', daysOnMarket: 36, originalEntryTimestamp: '2024-01-04', originatingSystemName: 'HAR' } },
    { mlsId: 'LD003', listPrice: 145000, property: { bedrooms: 0, bathsFull: 0, bathsHalf: 0, area: 15246, type: 'land', subType: 'Residential Lot', stories: 0, style: 'Vacant Land', yearBuilt: 0 }, address: { full: '0 Pine Brook Dr, Spring, TX 77373', city: 'Spring', state: 'TX', postalCode: '77373', streetNumber: '0', streetName: 'Pine Brook Dr', unit: null }, agent: AGENTS[2], office: AGENTS[2].office, photos: pickPhotos('land', 2), listDate: '2024-01-17', modificationTimestamp: '2024-01-23', internetAddressDisplay: true, internetEntireListingDisplay: true, remarks: 'Wooded residential lot in Spring, perfect for a custom home build. Quiet street, established neighborhood. Water and sewer available. Klein ISD schools.', geo: { lat: 30.07, lng: -95.38, county: 'Harris' }, association: { fee: null, name: null, amenities: null }, mls: { status: 'Active', area: 'Spring', daysOnMarket: 8, originalEntryTimestamp: '2024-01-17', originatingSystemName: 'HAR' } },
  ],
}

function getMockListings(type, minprice, maxprice, q) {
  let listings

  if (type === 'luxury') {
    listings = [...(MOCK_LISTINGS['luxury'] || [])]
  } else {
    listings = [...(MOCK_LISTINGS[type] || MOCK_LISTINGS['residential'])]
  }

  if (minprice) {
    listings = listings.filter((l) => l.listPrice >= minprice)
  }
  if (maxprice) {
    listings = listings.filter((l) => l.listPrice <= maxprice)
  }
  if (q) {
    const query = q.toLowerCase()
    listings = listings.filter(
      (l) =>
        l.address.city.toLowerCase().includes(query) ||
        l.address.streetName.toLowerCase().includes(query) ||
        l.address.postalCode.includes(query) ||
        l.remarks.toLowerCase().includes(query)
    )
  }

  return listings
}

export default async function handler(req, res) {
  const { type = 'residential', minprice, maxprice, limit = '12', q } = req.query

  const params = new URLSearchParams()
  params.set('type', type === 'luxury' ? 'residential' : type)
  params.set('limit', limit)
  params.set('status', 'Active')

  if (minprice) params.set('minprice', minprice)
  if (maxprice) params.set('maxprice', maxprice)
  if (type === 'luxury' && !minprice) params.set('minprice', '1000000')
  if (q) params.set('q', q)

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    const response = await fetch(`${SIMPLYRETS_API}?${params.toString()}`, {
      headers: {
        Authorization: `Basic ${SIMPLYRETS_AUTH}`,
        Accept: 'application/json',
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`MLS API returned ${response.status}`)
    }

    const listings = await response.json()
    return res.status(200).json(Array.isArray(listings) ? listings : [])
  } catch {
    const mockData = getMockListings(
      type,
      minprice ? Number(minprice) : undefined,
      maxprice ? Number(maxprice) : undefined,
      q ?? undefined
    )
    return res.status(200).json(mockData)
  }
}
