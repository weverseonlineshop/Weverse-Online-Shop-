// Showroom Phase 1 — 20 professional sample listings
// Real estate + vehicles. Uses real Pexels stock photo URLs of actual homes.

const PEXELS = (id, w = 800) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

// Real Pexels photo IDs — actual residential homes, interiors, and vehicles
const EXTERIOR = {
  suburbanTwoStorey: [10628458, 10827225, 4258282, 8894802, 4469133, 17246020],
  capeCodWhite: [18819232, 33643352, 17831878, 24245769],
  ranchBungalow: [10628468, 17831870, 18038074, 10286038],
  modernSuburban: [33350028, 6422929, 18280833, 38604168],
  brickHouse: [9869371, 6422929, 10628458, 8894802],
  villa: [1396122, 2102584, 32237414, 31817157],
  mansion: [20200273, 35069535, 8143671, 1396122],
  beachHouse: [29334714, 34958535, 29957213, 59924],
  farmHouse: [30216893, 17692984, 15743372, 30580640],
  commercial: [6474633, 16236366, 5378935, 31618415],
  hotel: [5853322, 28448027, 20296321, 17729218],
};

const INTERIOR = {
  livingRoom: [19916702, 6510951, 8089172, 21765129, 35189707, 36353381],
  kitchen: [30673264, 36511371, 14614482, 15409477, 6510951],
  bedroom: [19916702, 8089172, 21765129],
  bathroom: [10827343, 19227244, 19846350, 19966786, 19991863],
};

const VEHICLE = {
  car: [10054672, 11836424, 30809411, 31458555],
  motorhome: [14577843, 18797772],
};

// Build a gallery of 12 images: exterior front, exterior angle, then interiors
function propertyGallery(exteriorIds, count = 12) {
  const imgs = [];
  // Front exterior
  imgs.push(PEXELS(exteriorIds[0], 1200));
  // Side/back exterior
  if (exteriorIds[1]) imgs.push(PEXELS(exteriorIds[1], 1200));
  if (exteriorIds[2]) imgs.push(PEXELS(exteriorIds[2], 1200));
  // Living room
  imgs.push(PEXELS(INTERIOR.livingRoom[0], 1000));
  imgs.push(PEXELS(INTERIOR.livingRoom[1], 1000));
  // Kitchen
  imgs.push(PEXELS(INTERIOR.kitchen[0], 1000));
  imgs.push(PEXELS(INTERIOR.kitchen[1], 1000));
  // Bedroom
  imgs.push(PEXELS(INTERIOR.bedroom[0], 1000));
  imgs.push(PEXELS(INTERIOR.bedroom[1], 1000));
  // Bathroom
  imgs.push(PEXELS(INTERIOR.bathroom[0], 1000));
  // Additional exterior
  if (exteriorIds[3]) imgs.push(PEXELS(exteriorIds[3], 1200));
  // Additional living area
  imgs.push(PEXELS(INTERIOR.livingRoom[2], 1000));
  return imgs.slice(0, count);
}

function vehicleGallery(vehicleIds, count = 12) {
  const imgs = [];
  for (let i = 0; i < count; i++) {
    imgs.push(PEXELS(vehicleIds[i % vehicleIds.length], 1000));
  }
  return imgs;
}

// Build a 10-image gallery from explicit photo IDs — each home has its own unique set
function newHomeGallery(ids) {
  return ids.map((id, i) => PEXELS(id, i < 3 ? 1200 : 1000));
}

// Build a 10-image motorhome gallery from explicit photo IDs — each motorhome has its own unique set
function motorhomeGallery(ids) {
  return ids.map((id, i) => PEXELS(id, i < 3 ? 1200 : 1000));
}

export const SHOWROOM_LISTINGS = [
  // === REAL ESTATE (16 listings) — mix of affordable, mid-range, and premium ===

  // 1. Affordable starter home
  {
    property_id: 'KCO-000001', listing_type: 'property', category: 'Real Estate',
    title: 'Cozy Starter Home with Updated Kitchen',
    description: 'Perfect first home for a small family or couple starting out. This charming one-story house features a renovated kitchen with modern appliances, hardwood floors throughout, and a private backyard. The living room gets plenty of natural light through large windows. Located on a quiet street close to schools and a community park. Recently repainted exterior and a new roof installed two years ago. An excellent value in a growing neighborhood.',
    price: 89500, currency: 'USD', country: 'United States', country_code: 'US',
    state: 'Ohio', city: 'Columbus', town: 'Hilliard',
    bedrooms: 2, bathrooms: 1, building_size: '850 sqft', land_size: '0.15 acres',
    parking_spaces: 1, property_type: 'Single-Family Home', furnished: 'Unfurnished', listing_status: 'sale',
    images: propertyGallery(EXTERIOR.ranchBungalow), rating: 4.3, rating_count: 18, favorite_count: 12,
    features: ['Updated Kitchen', 'Hardwood Floors', 'New Roof', 'Private Backyard', 'Near Schools', 'Quiet Street', 'Carport'],
  },
  // 2. Suburban two-storey family home
  {
    property_id: 'KCO-000002', listing_type: 'property', category: 'Real Estate',
    title: 'Spacious Two-Storey Family Home with Garage',
    description: 'A well-maintained two-storey family home in a friendly suburban neighborhood. The main floor features an open living and dining area, a practical kitchen with breakfast bar, and a half bath. Upstairs offers three comfortable bedrooms and a full bathroom. The finished basement provides extra living space or a home office. Two-car attached garage and a level backyard perfect for kids. Walk to elementary school and local shops.',
    price: 245000, currency: 'USD', country: 'United States', country_code: 'US',
    state: 'Texas', city: 'Austin', town: 'Round Rock',
    bedrooms: 3, bathrooms: 2, building_size: '1,750 sqft', land_size: '0.2 acres',
    parking_spaces: 2, property_type: 'Single-Family Home', furnished: 'Unfurnished', listing_status: 'sale',
    images: propertyGallery(EXTERIOR.suburbanTwoStorey), rating: 4.5, rating_count: 42, favorite_count: 28,
    features: ['2-Car Garage', 'Finished Basement', 'Open Floor Plan', 'Breakfast Bar', 'Level Backyard', 'Walk to School', 'Air Conditioning'],
  },
  // 3. Cape Cod style home
  {
    property_id: 'KCO-000003', listing_type: 'property', category: 'Real Estate',
    title: 'Classic Cape Cod with Black Shutters',
    description: 'A timeless Cape Cod-style home with white clapboard siding and classic black shutters. The cozy living room features a wood-burning fireplace and built-in bookshelves. The kitchen has been updated with granite countertops and stainless steel appliances. Two bedrooms on the main level and a finished attic space used as a third bedroom or office. A picket fence and mature landscaping give this home excellent curb appeal. Located in an established neighborhood close to downtown.',
    price: 185000, currency: 'USD', country: 'United States', country_code: 'US',
    state: 'Massachusetts', city: 'Boston', town: 'Quincy',
    bedrooms: 3, bathrooms: 1, building_size: '1,200 sqft', land_size: '0.12 acres',
    parking_spaces: 1, property_type: 'Cape Cod', furnished: 'Unfurnished', listing_status: 'sale',
    images: propertyGallery(EXTERIOR.capeCodWhite), rating: 4.6, rating_count: 35, favorite_count: 22,
    features: ['Fireplace', 'Granite Countertops', 'Picket Fence', 'Mature Landscaping', 'Finished Attic', 'Built-in Bookshelves', 'Near Downtown'],
  },
  // 4. Duplex / two-family
  {
    property_id: 'KCO-000004', listing_type: 'property', category: 'Real Estate',
    title: 'Income-Producing Duplex — Live in One, Rent the Other',
    description: 'A solid two-family duplex offering excellent income potential. Each unit has two bedrooms, one bathroom, a living room, and a kitchen. Separate utilities and private entrances for each unit. The property has been well-maintained with updated electrical and a five-year-old roof. Both units are currently rented with reliable tenants. A great investment opportunity or house-hack setup for an owner-occupant. Conveniently located near public transit and shopping.',
    price: 320000, currency: 'USD', country: 'Canada', country_code: 'CA',
    state: 'Ontario', city: 'Toronto', town: 'Scarborough',
    bedrooms: 4, bathrooms: 2, building_size: '2,200 sqft', land_size: '0.18 acres',
    parking_spaces: 4, property_type: 'Duplex', furnished: 'Unfurnished', listing_status: 'sale',
    images: propertyGallery(EXTERIOR.modernSuburban), rating: 4.4, rating_count: 29, favorite_count: 31,
    features: ['Two Units', 'Separate Utilities', 'Private Entrances', 'Updated Electrical', 'New Roof', 'Rented Units', 'Near Transit', 'Investment Property'],
  },
  // 5. Renovated ranch house
  {
    property_id: 'KCO-000005', listing_type: 'property', category: 'Real Estate',
    title: 'Fully Renovated Ranch House on Quiet Cul-de-Sac',
    description: 'A beautifully renovated single-story ranch home on a desirable cul-de-sac. The renovation opened up the floor plan, creating a seamless flow between the living room, dining area, and kitchen. New kitchen includes soft-close cabinets, quartz countertops, and a tile backsplash. Both bathrooms have been completely updated. New flooring, fresh paint, and updated lighting throughout. The large backyard has a new patio and fire pit area. Move-in ready with nothing to do.',
    price: 275000, currency: 'USD', country: 'United States', country_code: 'US',
    state: 'North Carolina', city: 'Charlotte', town: 'Matthews',
    bedrooms: 3, bathrooms: 2, building_size: '1,500 sqft', land_size: '0.25 acres',
    parking_spaces: 2, property_type: 'Ranch House', furnished: 'Unfurnished', listing_status: 'sale',
    images: propertyGallery(EXTERIOR.ranchBungalow), rating: 4.7, rating_count: 56, favorite_count: 44,
    features: ['Fully Renovated', 'Open Floor Plan', 'Quartz Countertops', 'New Flooring', 'Updated Bathrooms', 'Patio', 'Fire Pit', 'Cul-de-Sac'],
  },
  // 6. Mid-range apartment for rent
  {
    property_id: 'KCO-000006', listing_type: 'property', category: 'Apartments',
    title: 'Bright Two-Bedroom Apartment Near Riverfront',
    description: 'A bright and airy two-bedroom apartment on the third floor of a well-managed building. The open-concept kitchen features modern appliances and a breakfast bar. Large windows in the living room offer pleasant city views. Both bedrooms are generously sized with good closet space. Building amenities include 24/7 concierge, fitness center, and rooftop terrace. Steps from the riverfront promenade, cafes, and public transit. Perfect for professionals seeking urban convenience.',
    price: 1450, price_period: 'month', currency: 'USD', country: 'United Kingdom', country_code: 'GB',
    state: 'England', city: 'London', town: 'Canary Wharf',
    bedrooms: 2, bathrooms: 2, building_size: '850 sqft', land_size: null,
    parking_spaces: 1, property_type: 'Apartment', furnished: 'Furnished', listing_status: 'rent',
    images: propertyGallery(EXTERIOR.modernSuburban), rating: 4.4, rating_count: 67, favorite_count: 38,
    features: ['Concierge', 'Fitness Center', 'Rooftop Terrace', 'Air Conditioning', 'Balcony', 'Pet Friendly', 'Elevator', 'Near Transit'],
  },
  // 7. Affordable villa
  {
    property_id: 'KCO-000007', listing_type: 'property', category: 'Villas',
    title: 'Modern Villa with Garden and Terrace',
    description: 'A contemporary villa offering comfortable family living at an accessible price point. The ground floor features an open-plan living and dining area with direct garden access. The kitchen is fully fitted with quality appliances. Upstairs, three bedrooms share a family bathroom, and the master has an en-suite. A covered terrace overlooks the landscaped garden with a lawn area. Located in a family-friendly development with shared playground and walking paths.',
    price: 350000, currency: 'USD', country: 'Spain', country_code: 'ES',
    state: 'Andalusia', city: 'Marbella', town: 'San Pedro de Alcántara',
    bedrooms: 3, bathrooms: 2, building_size: '1,800 sqft', land_size: '0.3 acres',
    parking_spaces: 2, property_type: 'Villa', furnished: 'Unfurnished', listing_status: 'sale',
    images: propertyGallery(EXTERIOR.villa), rating: 4.5, rating_count: 48, favorite_count: 33,
    features: ['Garden', 'Covered Terrace', 'Open Plan', 'En-suite Master', 'Family Bathroom', 'Playground Nearby', 'Air Conditioning'],
  },
  // 8. Mid-range mansion
  {
    property_id: 'KCO-000008', listing_type: 'property', category: 'Mansions',
    title: 'Grand Estate with Private Gardens and Pool',
    description: 'An impressive estate set on 1.5 acres of manicured grounds. The grand foyer leads to a formal living room with high ceilings and a fireplace. The gourmet kitchen features professional-grade appliances and a large island. The master suite includes a sitting area and spa-like bathroom. Additional amenities include a home gym, game room, and climate-controlled wine storage. The outdoor oasis includes a pool, spa, and outdoor kitchen. A rare offering in a prestigious neighborhood.',
    price: 850000, currency: 'USD', country: 'France', country_code: 'FR',
    state: 'Île-de-France', city: 'Paris', town: 'Neuilly-sur-Seine',
    bedrooms: 6, bathrooms: 5, building_size: '5,500 sqft', land_size: '1.5 acres',
    parking_spaces: 4, property_type: 'Mansion', furnished: 'Unfurnished', listing_status: 'sale',
    images: propertyGallery(EXTERIOR.mansion), rating: 4.8, rating_count: 52, favorite_count: 67,
    features: ['Pool & Spa', 'Outdoor Kitchen', 'Wine Storage', 'Home Gym', 'Game Room', 'Fireplace', '4-Car Garage', 'Smart Home'],
  },
  // 9. Beach house for rent
  {
    property_id: 'KCO-000009', listing_type: 'property', category: 'Beach Houses',
    title: 'Beachfront Cottage with Ocean Views',
    description: 'A charming beachfront cottage with direct ocean access and stunning sea views. The open living area flows to a large deck perfect for entertaining or relaxing to the sound of waves. The kitchen features coastal-inspired cabinetry and stainless steel appliances. Two bedrooms and one bathroom with a walk-in shower. Steps from a pristine sandy beach and a short walk to local cafes. A turnkey coastal retreat with strong vacation rental potential.',
    price: 2200, price_period: 'month', currency: 'USD', country: 'Australia', country_code: 'AU',
    state: 'Queensland', city: 'Gold Coast', town: 'Burleigh Heads',
    bedrooms: 2, bathrooms: 1, building_size: '1,000 sqft', land_size: '0.1 acres',
    parking_spaces: 1, property_type: 'Beach Cottage', furnished: 'Furnished', listing_status: 'rent',
    images: propertyGallery(EXTERIOR.beachHouse), rating: 4.6, rating_count: 73, favorite_count: 51,
    features: ['Ocean View', 'Direct Beach Access', 'Deck', 'Air Conditioning', 'Outdoor Shower', 'Furnished', 'Walk to Cafes', 'Pet Friendly'],
  },
  // 10. Luxury condominium
  {
    property_id: 'KCO-000010', listing_type: 'property', category: 'Luxury Condominiums',
    title: 'Skyline Condo with Floor-to-Ceiling Windows',
    description: 'An ultra-modern luxury condominium on the 35th floor with breathtaking skyline views. The residence features an open floor plan, designer kitchen with quartz countertops, and spa-like bathrooms. Building amenities include a sky lounge, indoor pool, fitness center, and 24-hour valet. Steps from fine dining, luxury shopping, and the business district. A premier address for the discerning urbanite seeking a lock-and-leave lifestyle.',
    price: 4200, price_period: 'month', currency: 'USD', country: 'United Arab Emirates', country_code: 'AE',
    state: 'Dubai', city: 'Dubai', town: 'Downtown Dubai',
    bedrooms: 2, bathrooms: 2, building_size: '1,200 sqft', land_size: null,
    parking_spaces: 1, property_type: 'Condominium', furnished: 'Furnished', listing_status: 'rent',
    images: propertyGallery(EXTERIOR.modernSuburban), rating: 4.7, rating_count: 91, favorite_count: 58,
    features: ['Sky Lounge', 'Indoor Pool', 'Fitness Center', '24h Valet', 'Concierge', 'Smart Home', 'Balcony', 'City View'],
  },
  // 11. Farmhouse with acreage
  {
    property_id: 'KCO-000011', listing_type: 'property', category: 'Farm Houses',
    title: 'Restored Farmhouse with 5 Acres and Barn',
    description: 'A beautifully restored 19th-century farmhouse on 5 acres of pastoral land. The home retains its original charm with exposed beams and stone fireplaces while offering modern comforts. The property includes a restored barn suitable for equestrian use, a chicken coop, and established vegetable gardens. Peaceful country living with easy access to the nearby town. Ideal for a hobby farm, equestrian setup, or those seeking space and tranquility.',
    price: 295000, currency: 'USD', country: 'Canada', country_code: 'CA',
    state: 'Ontario', city: 'Ottawa', town: 'Manotick',
    bedrooms: 3, bathrooms: 2, building_size: '2,200 sqft', land_size: '5 acres',
    parking_spaces: 4, property_type: 'Farmhouse', furnished: 'Unfurnished', listing_status: 'sale',
    images: propertyGallery(EXTERIOR.farmHouse), rating: 4.5, rating_count: 38, favorite_count: 24,
    features: ['Barn', '5 Acres', 'Fireplace', 'Garden', 'Chicken Coop', 'Equestrian Ready', 'Exposed Beams', 'Solar Panels'],
  },
  // 12. Commercial building
  {
    property_id: 'KCO-000012', listing_type: 'property', category: 'Commercial Buildings',
    title: 'Prime Retail Building on High-Traffic Avenue',
    description: 'A strategically located commercial building on a high-traffic avenue with excellent visibility. The ground floor offers 2,500 sqft of retail space with large storefront windows. The upper floor features modern office space with a separate entrance. Ample parking for 20 vehicles and excellent signage opportunities. Strong rental history with a long-term tenant. A solid investment in a growing commercial corridor.',
    price: 475000, currency: 'USD', country: 'Germany', country_code: 'DE',
    state: 'Bavaria', city: 'Munich', town: 'Schwabing',
    bedrooms: null, bathrooms: 2, building_size: '4,500 sqft', land_size: '0.3 acres',
    parking_spaces: 20, property_type: 'Commercial', furnished: 'Unfurnished', listing_status: 'sale',
    images: propertyGallery(EXTERIOR.commercial), rating: 4.3, rating_count: 22, favorite_count: 15,
    features: ['High Traffic', 'Storefront Windows', 'Office Space', 'Parking 20', 'Signage Available', 'Separate Entrance', 'Long-Term Tenant'],
  },
  // 13. Affordable suburban home
  {
    property_id: 'KCO-000013', listing_type: 'property', category: 'Real Estate',
    title: 'Affordable Brick Home with Large Backyard',
    description: 'A solid brick home offering great value for a growing family. The main floor has a comfortable living room, formal dining room, and a practical kitchen with plenty of cabinet space. Three bedrooms upstairs with a shared full bathroom. The large fenced backyard is perfect for children and pets, with a storage shed and room for a garden. Attached single garage and a long driveway for extra parking. Located in an established neighborhood near parks and schools.',
    price: 165000, currency: 'USD', country: 'United States', country_code: 'US',
    state: 'Indiana', city: 'Indianapolis', town: 'Fishers',
    bedrooms: 3, bathrooms: 1, building_size: '1,400 sqft', land_size: '0.22 acres',
    parking_spaces: 3, property_type: 'Single-Family Home', furnished: 'Unfurnished', listing_status: 'sale',
    images: propertyGallery(EXTERIOR.brickHouse), rating: 4.2, rating_count: 19, favorite_count: 14,
    features: ['Brick Construction', 'Fenced Yard', 'Attached Garage', 'Storage Shed', 'Near Parks', 'Near Schools', 'Formal Dining Room'],
  },
  // 14. Hotel
  {
    property_id: 'KCO-000014', listing_type: 'property', category: 'Hotels',
    title: 'Boutique Hotel Near Historic City Center',
    description: 'A charming 24-room boutique hotel steps from the historic city center. Each room is uniquely decorated with local art and premium furnishings. The property features a restaurant, bar, courtyard garden, and rooftop terrace. Strong occupancy rates and excellent reviews across all platforms. Turnkey operation with trained staff and established booking systems. A rare opportunity in a top tourist destination.',
    price: 1850000, currency: 'USD', country: 'Italy', country_code: 'IT',
    state: 'Tuscany', city: 'Florence', town: 'Oltrarno',
    bedrooms: 24, bathrooms: 24, building_size: '10,000 sqft', land_size: '0.5 acres',
    parking_spaces: 12, property_type: 'Hotel', furnished: 'Furnished', listing_status: 'sale',
    images: propertyGallery(EXTERIOR.hotel), rating: 4.8, rating_count: 287, favorite_count: 98,
    features: ['Restaurant', 'Bar', 'Courtyard Garden', 'Rooftop Terrace', '24 Rooms', 'Reception', 'Turnkey Operation', 'Laundry'],
  },
  // 15. Beach house for sale
  {
    property_id: 'KCO-000015', listing_type: 'property', category: 'Beach Houses',
    title: 'Modern Beach House with Wraparound Deck',
    description: 'A modern beach house designed for indoor-outdoor coastal living. The open living area features vaulted ceilings and large windows capturing ocean views. The kitchen has been updated with coastal-inspired finishes and stainless steel appliances. Three bedrooms including a master suite with a private balcony. The wraparound deck is perfect for entertaining, with stairs leading directly to the beach. Hurricane-rated windows and a new roof provide peace of mind.',
    price: 385000, currency: 'USD', country: 'Australia', country_code: 'AU',
    state: 'Queensland', city: 'Gold Coast', town: 'Surfers Paradise',
    bedrooms: 3, bathrooms: 2, building_size: '1,800 sqft', land_size: '0.18 acres',
    parking_spaces: 2, property_type: 'Beach House', furnished: 'Furnished', listing_status: 'sale',
    images: propertyGallery(EXTERIOR.beachHouse), rating: 4.7, rating_count: 64, favorite_count: 47,
    features: ['Ocean View', 'Wraparound Deck', 'Direct Beach Access', 'Hurricane Windows', 'Vaulted Ceilings', 'Master Balcony', 'Air Conditioning', 'Outdoor Shower'],
  },
  // 16. Affordable apartment for sale
  {
    property_id: 'KCO-000016', listing_type: 'property', category: 'Apartments',
    title: 'Studio Apartment in Vibrant Arts District',
    description: 'A stylish studio apartment in the vibrant arts district, perfect for first-time buyers or investors. The unit features an efficient layout with a modern kitchenette, updated bathroom, and a private balcony. The building offers a communal rooftop garden and secure bike storage. Walk to galleries, cafes, and public transit. Strong rental demand in this up-and-coming neighborhood makes it an excellent investment.',
    price: 65000, currency: 'USD', country: 'Netherlands', country_code: 'NL',
    state: 'North Holland', city: 'Amsterdam', town: 'Jordaan',
    bedrooms: 1, bathrooms: 1, building_size: '400 sqft', land_size: null,
    parking_spaces: 0, property_type: 'Studio Apartment', furnished: 'Unfurnished', listing_status: 'sale',
    images: propertyGallery(EXTERIOR.modernSuburban), rating: 4.1, rating_count: 31, favorite_count: 19,
    features: ['Balcony', 'Rooftop Garden', 'Bike Storage', 'Elevator', 'Near Transit', 'Walk to Cafes', 'Investment Potential'],
  },

  // === VEHICLES (4 listings) ===
  {
    property_id: 'KCO-000017', listing_type: 'vehicle', category: 'Cars',
    title: 'Mercedes-Benz S-Class 2024 — Premium Sedan',
    description: 'The 2024 Mercedes-Benz S-Class represents the pinnacle of luxury sedans. This flagship model features a 3.0L inline-6 turbo engine with EQ Boost delivering 429 horsepower. The cabin offers executive rear seating with massage, heated and ventilated Nappa leather seats, and a rear-seat entertainment system. The MBUX infotainment system includes a 12.8-inch OLED touchscreen with voice control. Advanced safety features include adaptive cruise control, lane-keeping assist, and a 360-degree camera. Immaculate condition with low mileage and full service history.',
    price: 115000, currency: 'USD', country: '', country_code: '',
    state: null, city: null, town: null,
    bedrooms: null, bathrooms: null, building_size: null, land_size: null,
    parking_spaces: null, property_type: 'Sedan', furnished: null, listing_status: 'sale',
    images: vehicleGallery(VEHICLE.car), rating: 4.9, rating_count: 87, favorite_count: 64,
    features: ['3.0L Inline-6 Turbo', '429 HP', 'Nappa Leather', 'MBUX System', 'Adaptive Cruise', '360 Camera', 'Panoramic Roof', 'Low Mileage'],
  },
  {
    property_id: 'KCO-000018', listing_type: 'vehicle', category: 'Cars',
    title: 'Mercedes-Benz GLE 450 2025 — Luxury SUV',
    description: 'The 2025 Mercedes-Benz GLE 450 combines SUV capability with luxury refinement. Powered by a 3.0L inline-6 turbo engine with EQ Boost producing 375 horsepower and 4MATIC all-wheel drive. The spacious interior features MB-Tex upholstery, a 12.3-inch digital dashboard, and a Burmester sound system. Seven-seat configuration with power-folding third row. Includes trailer hitch, air suspension, and off-road driving modes. One owner, pristine condition, factory warranty active.',
    price: 89500, currency: 'USD', country: '', country_code: '',
    state: null, city: null, town: null,
    bedrooms: null, bathrooms: null, building_size: null, land_size: null,
    parking_spaces: null, property_type: 'SUV', furnished: null, listing_status: 'sale',
    images: vehicleGallery(VEHICLE.car), rating: 4.8, rating_count: 65, favorite_count: 48,
    features: ['3.0L Inline-6 Turbo', '375 HP', '4MATIC AWD', '7 Seats', 'Air Suspension', 'Burmester Audio', 'Trailer Hitch', 'Warranty Active'],
  },
  {
    property_id: 'KCO-000019', listing_type: 'vehicle', category: 'Motorhomes',
    title: 'Luxury Class A Motorhome 2024 — Diesel Pusher',
    description: 'A top-of-the-line Class A diesel pusher motorhome built for cross-country luxury travel. Powered by a Cummins 8.9L turbo diesel engine with 380 horsepower on a Freightliner chassis. The interior features three slide-outs, residential kitchen with residential refrigerator, king-size bed, and a full bathroom with glass shower. Includes a 10kW diesel generator, solar power system, and 100-gallon fresh water tank. Sleeps 6 comfortably. Excellent condition with all maintenance up to date.',
    price: 285000, currency: 'USD', country: '', country_code: '',
    state: null, city: null, town: null,
    bedrooms: null, bathrooms: null, building_size: null, land_size: null,
    parking_spaces: null, property_type: 'Class A Motorhome', furnished: null, listing_status: 'sale',
    images: vehicleGallery(VEHICLE.motorhome), rating: 4.7, rating_count: 42, favorite_count: 35,
    features: ['Cummins 8.9L Diesel', '380 HP', '3 Slide-outs', 'Residential Kitchen', 'Solar Power', '10kW Generator', 'Sleeps 6', '100 Gal Water'],
  },
  {
    property_id: 'KCO-000020', listing_type: 'vehicle', category: 'Motorhomes',
    title: 'Mercedes-Benz Sprinter Camper Van 2025',
    description: 'A premium camper van built on the 2025 Mercedes-Benz Sprinter 2500 chassis with a 2.0L turbo diesel engine and 4WD. The custom interior features a pop-top roof with sleeping loft, kitchenette with sink and stove, portable toilet, and a bench seat that converts to a bed. Includes a 200W solar panel, 12V fridge, and Webasto heating system. Compact enough for city driving yet fully equipped for off-grid adventures. Perfect for couples or solo travelers.',
    price: 145000, currency: 'USD', country: '', country_code: '',
    state: null, city: null, town: null,
    bedrooms: null, bathrooms: null, building_size: null, land_size: null,
    parking_spaces: null, property_type: 'Camper Van', furnished: null, listing_status: 'sale',
    images: vehicleGallery(VEHICLE.motorhome), rating: 4.8, rating_count: 51, favorite_count: 44,
    features: ['2.0L Turbo Diesel', '4WD', 'Pop-Top Roof', 'Kitchenette', 'Solar Panel', '12V Fridge', 'Webasto Heat', 'Sleeps 2'],
  },

  // === 5 NEW MOTORHOMES (unique brands, styles, and galleries) ===

  // 31. Class A Luxury Motorhome — Tiffin Allegro Bus 2026
  {
    property_id: 'KCO-000031', listing_type: 'vehicle', category: 'Motorhomes',
    title: 'Tiffin Allegro Bus 45 OPN 2026 — Class A Diesel Pusher',
    description: 'The 2026 Tiffin Allegro Bus 45 OPN is a flagship Class A diesel pusher motorhome built on a Freightliner XCM raised-rail chassis. Powered by a Cummins X15 12.9L turbo diesel engine producing 500 horsepower and 1,250 lb-ft of torque, paired with an Allison 3000 MH 6-speed automatic transmission. The interior features four slide-outs, a residential kitchen with a 21-cu-ft residential refrigerator, a king-size bed, and a full bathroom with a glass-enclosed shower. Includes a 12kW Onan diesel generator, a 800W solar system, and a 100-gallon fresh water tank. Sleeps 6 with a power drop-down bunk over the cab. This unit is brand new with full factory warranty.',
    price: 475000, currency: 'USD', country: '', country_code: '',
    state: null, city: null, town: null,
    bedrooms: null, bathrooms: null, building_size: null, land_size: null,
    parking_spaces: null, property_type: 'Class A Motorhome', furnished: null, listing_status: 'sale',
    brand: 'Tiffin', model: 'Allegro Bus 45 OPN', model_year: 2026, condition: 'New', mileage: '0 mi',
    transmission: 'Allison 3000 MH 6-Speed Auto', fuel_type: 'Diesel',
    engine: 'Cummins X15 12.9L I6 (500 HP, 1,250 lb-ft)', drive_type: 'RWD', color: 'Platinum Silver',
    sleeping_capacity: '6', seating_capacity: '8', bathroom: 'Full Bath with Glass Shower', kitchen: 'Residential Kitchen with 21-cu-ft Fridge', water_tank: '100 gallons',
    images: motorhomeGallery([10539694, 14523224, 14810447, 14816413, 14924831, 15240765, 15276639, 15346246, 17674305, 27620842]),
    rating: 4.9, rating_count: 38, favorite_count: 31,
    features: ['Cummins X15 500 HP', '4 Slide-outs', 'Residential Refrigerator', '12kW Generator', '800W Solar', '100 Gal Water', 'Power Drop-down Bunk', 'King Bed', 'Winegard Satellite', 'Hydraulic Leveling Jacks'],
  },
  // 32. Class B Camper Van — Airstream Atlas 2025
  {
    property_id: 'KCO-000032', listing_type: 'vehicle', category: 'Motorhomes',
    title: 'Airstream Atlas 2025 — Class B Camper Van',
    description: 'The 2025 Airstream Atlas is a premium Class B camper van built on the Mercedes-Benz Sprinter 2500 4WD chassis. Powered by a 3.0L turbo diesel V6 producing 211 horsepower and 325 lb-ft of torque, paired with a 7-speed automatic transmission. The interior features a power retractable sofa bed, a wet bath with a cassette toilet, and a galley kitchen with a 12V compressor fridge and induction cooktop. Includes a 200W solar panel, 20-gallon fresh water tank, and a Truma Combi eco heating system. Sleeps 2 and seats 2. Compact enough for city driving and off-grid adventures alike. This unit is brand new with full warranty.',
    price: 168000, currency: 'USD', country: '', country_code: '',
    state: null, city: null, town: null,
    bedrooms: null, bathrooms: null, building_size: null, land_size: null,
    parking_spaces: null, property_type: 'Class B Camper Van', furnished: null, listing_status: 'sale',
    brand: 'Airstream', model: 'Atlas', model_year: 2025, condition: 'New', mileage: '0 mi',
    transmission: '7-Speed Auto', fuel_type: 'Diesel',
    engine: '3.0L Turbo Diesel V6 (211 HP, 325 lb-ft)', drive_type: '4WD', color: 'Airstream Silver',
    sleeping_capacity: '2', seating_capacity: '2', bathroom: 'Wet Bath with Cassette Toilet', kitchen: 'Galley with 12V Fridge and Induction Cooktop', water_tank: '20 gallons',
    images: motorhomeGallery([28897042, 386025, 5836331, 6945637, 6945900, 6945904, 6945908, 6946075, 7476895, 7990947]),
    rating: 4.7, rating_count: 44, favorite_count: 29,
    features: ['Mercedes Sprinter 4WD', 'Power Retractable Sofa Bed', '200W Solar', 'Truma Combi Heat', 'Cassette Toilet', 'Induction Cooktop', '12V Compressor Fridge', 'Sleeps 2'],
  },
  // 33. Class C Motorhome — Winnebago Navion 2024
  {
    property_id: 'KCO-000033', listing_type: 'vehicle', category: 'Motorhomes',
    title: 'Winnebago Navion 24V 2024 — Class C Family Motorhome',
    description: 'The 2024 Winnebago Navion 24V is a versatile Class C motorhome built on the Mercedes-Benz Sprinter 3500 chassis. Powered by a 3.0L turbo diesel V6 producing 188 horsepower, paired with a 7-speed automatic transmission. The interior features a cab-over bunk, a rear corner bed, a dinette that converts to a bed, and a full bathroom with a shower. The kitchen includes a 3-burner cooktop, a 10.7-cu-ft refrigerator, and a microwave. Includes a 215W solar panel, 30-gallon fresh water tank, and a 3,200W Cummins Onan generator. Sleeps 5 and seats 7. This unit is in excellent used condition with 18,500 miles and a full service history.',
    price: 112000, currency: 'USD', country: '', country_code: '',
    state: null, city: null, town: null,
    bedrooms: null, bathrooms: null, building_size: null, land_size: null,
    parking_spaces: null, property_type: 'Class C Motorhome', furnished: null, listing_status: 'sale',
    brand: 'Winnebago', model: 'Navion 24V', model_year: 2024, condition: 'Used', mileage: '18,500 mi',
    transmission: '7-Speed Auto', fuel_type: 'Diesel',
    engine: '3.0L Turbo Diesel V6 (188 HP)', drive_type: 'RWD', color: 'White with Grey Accents',
    sleeping_capacity: '5', seating_capacity: '7', bathroom: 'Full Bath with Shower', kitchen: 'Kitchen with 3-Burner Cooktop and 10.7-cu-ft Fridge', water_tank: '30 gallons',
    images: motorhomeGallery([8231014, 8973338, 8975069, 9143482, 13304737, 13601011, 13610268, 13721782, 14766762, 14766770]),
    rating: 4.6, rating_count: 52, favorite_count: 38,
    features: ['Cab-over Bunk', '215W Solar', '3,200W Generator', 'Dinette Bed', 'Rear Corner Bed', 'Full Bath', 'Sleeps 5', 'Mercedes Sprinter Chassis'],
  },
  // 34. Luxury Motorhome — Newmar Dutch Star 2027
  {
    property_id: 'KCO-000034', listing_type: 'vehicle', category: 'Motorhomes',
    title: 'Newmar Dutch Star 4369 2027 — Luxury Class A Diesel',
    description: 'The 2027 Newmar Dutch Star 4369 is the pinnacle of luxury Class A diesel motorhomes. Built on a Spartan K3 raised-rail chassis, it is powered by a Cummins X15 12.9L turbo diesel engine delivering 605 horsepower and 1,950 lb-ft of torque through an Allison 4000 MH 6-speed automatic transmission. The interior boasts four slide-outs, a full-wall slide, a chef\'s kitchen with a 24-cu-ft residential refrigerator and a residential induction range, a king-size Sleep Number bed, and a spa-like master bath with a tile shower. Includes a 21kW Cummins Onan diesel generator, a 1,200W solar system, and a 125-gallon fresh water tank. Sleeps 6 and seats 8. Brand new with full warranty and Comfort Drive steering assist.',
    price: 625000, currency: 'USD', country: '', country_code: '',
    state: null, city: null, town: null,
    bedrooms: null, bathrooms: null, building_size: null, land_size: null,
    parking_spaces: null, property_type: 'Class A Motorhome', furnished: null, listing_status: 'sale',
    brand: 'Newmar', model: 'Dutch Star 4369', model_year: 2027, condition: 'New', mileage: '0 mi',
    transmission: 'Allison 4000 MH 6-Speed Auto', fuel_type: 'Diesel',
    engine: 'Cummins X15 12.9L I6 (605 HP, 1,950 lb-ft)', drive_type: 'RWD', color: 'Chestnut Brown',
    sleeping_capacity: '6', seating_capacity: '8', bathroom: 'Spa Master Bath with Tile Shower', kitchen: 'Chef\'s Kitchen with 24-cu-ft Residential Fridge', water_tank: '125 gallons',
    images: motorhomeGallery([17816414, 24363123, 29589856, 3042332, 3195762, 34287638, 3560366, 38021445, 5064952, 5991595]),
    rating: 4.9, rating_count: 26, favorite_count: 22,
    features: ['Cummins X15 605 HP', '4 Slide-outs', 'Full-Wall Slide', '21kW Generator', '1,200W Solar', 'Sleep Number Bed', 'Comfort Drive Steering', '125 Gal Water', 'Residential Induction Range', 'Tile Shower'],
  },
  // 35. Family Motorhome — Forest River Georgetown 2023
  {
    property_id: 'KCO-000035', listing_type: 'vehicle', category: 'Motorhomes',
    title: 'Forest River Georgetown GT7 36B5 2023 — Family Class A',
    description: 'The 2023 Forest River Georgetown GT7 36B5 is a family-friendly Class A gas motorhome built on a Ford F-53 chassis. Powered by a 7.3L Triton V8 gasoline engine producing 350 horsepower and 468 lb-ft of torque, paired with a 6-speed automatic transmission. The interior features three slide-outs, a bunkhouse with three bunks for the kids, a master queen bed, a full bathroom, and a half bath. The kitchen includes a 16-cu-ft refrigerator, a 3-burner cooktop, and an oven. Includes a 5,500W Cummins Onan gas generator, 75-gallon fresh water tank, and a 300W solar panel. Sleeps 8 and seats 8. This unit is in excellent used condition with 22,300 miles and a clean service history.',
    price: 89500, currency: 'USD', country: '', country_code: '',
    state: null, city: null, town: null,
    bedrooms: null, bathrooms: null, building_size: null, land_size: null,
    parking_spaces: null, property_type: 'Class A Motorhome', furnished: null, listing_status: 'sale',
    brand: 'Forest River', model: 'Georgetown GT7 36B5', model_year: 2023, condition: 'Used', mileage: '22,300 mi',
    transmission: '6-Speed Auto', fuel_type: 'Gasoline',
    engine: '7.3L Triton V8 (350 HP, 468 lb-ft)', drive_type: 'RWD', color: 'White with Blue Decals',
    sleeping_capacity: '8', seating_capacity: '8', bathroom: 'Full Bath + Half Bath', kitchen: 'Kitchen with 16-cu-ft Fridge and Oven', water_tank: '75 gallons',
    images: motorhomeGallery([5994745, 7967406, 7510668, 7967365, 7967373, 7967374, 7967386, 7967387, 7967392, 7967405]),
    rating: 4.5, rating_count: 61, favorite_count: 43,
    features: ['3 Bunk Beds', 'Full Bath + Half Bath', '5,500W Generator', '300W Solar', 'Sleeps 8', 'Ford F-53 Chassis', '16-cu-ft Fridge', 'Queen Master Bed'],
  },

  // === 10 NEW INTERNATIONAL HOMES (one per country) ===

  // 21. United States — Affordable Craftsman Bungalow
  {
    property_id: 'KCO-000021', listing_type: 'property', category: 'International Homes',
    title: 'Craftsman Bungalow with Covered Porch in Portland',
    description: 'A charming 1928 Craftsman bungalow in the heart of Portland\'s Alberta Arts District. This lovingly maintained home features original hardwood floors, built-in bookshelves, and a wood-burning fireplace. The renovated kitchen opens to a cozy dining nook with garden views. Two main-floor bedrooms share a fully updated bathroom, with a third bedroom and second bathroom upstairs. The covered front porch is perfect for morning coffee, and the fenced backyard includes raised garden beds and a detached one-car garage. Walk to cafes, galleries, and weekly farmers market.',
    price: 185000, currency: 'USD', country: 'United States', country_code: 'US',
    state: 'Oregon', city: 'Portland', town: 'Alberta Arts District',
    bedrooms: 3, bathrooms: 2, building_size: '1,450 sqft', land_size: '0.12 acres',
    parking_spaces: 1, property_type: 'Craftsman Bungalow', furnished: 'Unfurnished', listing_status: 'sale',
    year_built: 1928,
    images: newHomeGallery([1022936, 13771880, 15986536, 11354266, 13807028, 10117730, 10758468, 10213877, 15583592, 10258628]),
    rating: 4.5, rating_count: 38, favorite_count: 25,
    features: ['Hardwood Floors', 'Wood-Burning Fireplace', 'Covered Porch', 'Built-in Bookshelves', 'Detached Garage', 'Raised Garden Beds', 'Near Farmers Market', 'Updated Plumbing'],
  },
  // 22. Canada — Mid-range Victorian Heritage Home
  {
    property_id: 'KCO-000022', listing_type: 'property', category: 'International Homes',
    title: 'Restored Victorian Heritage Home in Vancouver',
    description: 'A grand 1905 Victorian heritage home on a tree-lined street in Vancouver\'s Kitsilano neighbourhood. This meticulously restored home retains its original woodwork, stained glass windows, and ornate fireplaces while offering modern comforts. The main floor features a formal parlour, dining room, and a renovated chef\'s kitchen with butler\'s pantry. Four bedrooms across the upper two floors, including a master suite with sitting area. The landscaped garden includes a patio and detached two-car garage. Steps from Kitsilano Beach and West 4th Avenue shopping.',
    price: 285000, currency: 'USD', country: 'Canada', country_code: 'CA',
    state: 'British Columbia', city: 'Vancouver', town: 'Kitsilano',
    bedrooms: 4, bathrooms: 3, building_size: '2,400 sqft', land_size: '0.15 acres',
    parking_spaces: 2, property_type: 'Victorian Heritage Home', furnished: 'Unfurnished', listing_status: 'sale',
    year_built: 1905,
    images: newHomeGallery([16804979, 18078684, 18214902, 14714646, 1484981, 10855206, 13009887, 15683265, 15743369, 10917541]),
    rating: 4.7, rating_count: 44, favorite_count: 31,
    features: ['Heritage Designation', 'Original Woodwork', 'Stained Glass Windows', 'Ornate Fireplaces', 'Butler\'s Pantry', 'Landscaped Garden', 'Detached Garage', 'Near Beach'],
  },
  // 23. United Kingdom — Affordable Victorian Terraced House
  {
    property_id: 'KCO-000023', listing_type: 'property', category: 'International Homes',
    title: 'Victorian Terraced House Near Manchester City Centre',
    description: 'A characterful 1895 Victorian terraced house in the popular Chorlton area of Manchester. This home has been thoughtfully updated while preserving period features including sash windows, high ceilings, and cast-iron fireplaces. The ground floor offers a bay-windowed living room, a separate dining room, and a modern galley kitchen leading to a compact rear courtyard garden. Two double bedrooms upstairs share a contemporary family bathroom. Excellent transport links with the Metrolink tram a three-minute walk away. Ideal for first-time buyers or as a city base.',
    price: 175000, currency: 'USD', country: 'United Kingdom', country_code: 'GB',
    state: 'England', city: 'Manchester', town: 'Chorlton',
    bedrooms: 2, bathrooms: 1, building_size: '850 sqft', land_size: '0.03 acres',
    parking_spaces: 0, property_type: 'Victorian Terraced House', furnished: 'Unfurnished', listing_status: 'sale',
    year_built: 1895,
    images: newHomeGallery([1862402, 19344325, 1974596, 16501662, 16820353, 15409513, 17240686, 15859214, 18132311, 12405529]),
    rating: 4.3, rating_count: 27, favorite_count: 18,
    features: ['Period Features', 'Sash Windows', 'Cast-Iron Fireplaces', 'Rear Courtyard Garden', 'Near Metrolink', 'Walk to Cafes', 'Double Glazing', 'Central Heating'],
  },
  // 24. Australia — Mid-range Contemporary Family Home
  {
    property_id: 'KCO-000024', listing_type: 'property', category: 'International Homes',
    title: 'Contemporary Family Home with Alfresco Dining in Melbourne',
    description: 'A modern 2015 family home in Melbourne\'s thriving eastern suburb of Box Hill. The open-plan living and dining area flows seamlessly to an alfresco entertaining zone with a built-in BBQ and paved patio. The kitchen features stone benchtops, a walk-in pantry, and premium stainless steel appliances. Four bedrooms include a master retreat with walk-in robe and en-suite. Ducted air conditioning, solar panels, and a double remote garage with internal access. Walking distance to Box Hill Central shopping, top-rated schools, and parklands.',
    price: 425000, currency: 'USD', country: 'Australia', country_code: 'AU',
    state: 'Victoria', city: 'Melbourne', town: 'Box Hill',
    bedrooms: 4, bathrooms: 2, building_size: '2,100 sqft', land_size: '0.2 acres',
    parking_spaces: 2, property_type: 'Contemporary Family Home', furnished: 'Unfurnished', listing_status: 'sale',
    year_built: 2015,
    images: newHomeGallery([23639035, 2816284, 29566891, 17948130, 19227234, 18033166, 18285887, 18492337, 18823960, 12870169]),
    rating: 4.6, rating_count: 52, favorite_count: 36,
    features: ['Open-Plan Living', 'Ducted Air Conditioning', 'Alfresco Dining', 'Solar Panels', 'Stone Benchtops', 'Walk-in Pantry', 'Double Garage', 'Near Top Schools'],
  },
  // 25. Germany — Mid-range Modern Apartment
  {
    property_id: 'KCO-000025', listing_type: 'property', category: 'International Homes',
    title: 'Modern Energy-Efficient Apartment in Berlin Mitte',
    description: 'A sleek 2018 apartment in a boutique energy-efficient development in Berlin\'s sought-after Mitte district. The residence features underfloor heating throughout, floor-to-ceiling windows with electric blinds, and a high-spec built-in kitchen with integrated appliances. Three bedrooms and two bathrooms, including an en-suite master. The private balcony overlooks a quiet inner courtyard. Building amenities include a lift, bicycle storage room, and a communal rooftop garden. Two minutes from the Rosenthaler Platz U-Bahn station and surrounded by galleries, restaurants, and shops.',
    price: 390000, currency: 'USD', country: 'Germany', country_code: 'DE',
    state: 'Berlin', city: 'Berlin', town: 'Mitte',
    bedrooms: 3, bathrooms: 2, building_size: '1,350 sqft', land_size: null,
    parking_spaces: 1, property_type: 'Modern Apartment', furnished: 'Unfurnished', listing_status: 'sale',
    year_built: 2018,
    images: newHomeGallery([30699851, 32226825, 323780, 2343469, 276746, 19312081, 19966809, 19980080, 26840825, 13009039]),
    rating: 4.6, rating_count: 41, favorite_count: 28,
    features: ['Underfloor Heating', 'Floor-to-Ceiling Windows', 'Built-in Kitchen', 'Private Balcony', 'Elevator', 'Bicycle Storage', 'Rooftop Garden', 'Energy Efficient'],
  },
  // 26. France — Luxury Château
  {
    property_id: 'KCO-000026', listing_type: 'property', category: 'International Homes',
    title: '18th-Century Château with Vineyard Views in Provence',
    description: 'A magnificent 1780 château set on 4.5 acres of manicured grounds in the heart of Provence. The grand entrance hall leads to formal reception rooms with original marble fireplaces, tall French windows, and parquet de chêne flooring. The gourmet kitchen opens to a shaded dining terrace overlooking the swimming pool and formal gardens. Eight bedrooms and six bathrooms across three floors, including a master wing with dressing room and private salon. The wine cellar is carved into the natural rock. Staff quarters and a helipad complete this exceptional estate. Thirty minutes from Avignon TGV station.',
    price: 1250000, currency: 'USD', country: 'France', country_code: 'FR',
    state: 'Provence-Alpes-Côte d\'Azur', city: 'Avignon', town: 'Saint-Rémy-de-Provence',
    bedrooms: 8, bathrooms: 6, building_size: '6,500 sqft', land_size: '4.5 acres',
    parking_spaces: 6, property_type: 'Château', furnished: 'Partially Furnished', listing_status: 'sale',
    year_built: 1780,
    images: newHomeGallery([32716845, 33213827, 33258708, 280239, 28542161, 20348123, 29012619, 28238364, 29100031, 17741596]),
    rating: 4.9, rating_count: 33, favorite_count: 52,
    features: ['Vineyard Views', 'Swimming Pool', 'Formal Gardens', 'Wine Cellar', 'Marble Fireplaces', 'Staff Quarters', 'Helipad', 'Smart Home System'],
  },
  // 27. Italy — Mid-range Tuscan Farmhouse
  {
    property_id: 'KCO-000027', listing_type: 'property', category: 'International Homes',
    title: 'Restored Tuscan Farmhouse with Olive Grove',
    description: 'A beautifully restored 1850 stone farmhouse nestled among 2.5 acres of olive groves in the Tuscan countryside near San Casciano. The home retains its authentic character with exposed chestnut beams, terracotta tile floors, and a wood-fired bread oven in the garden. The ground floor has a farmhouse kitchen with a stone sink, a dining room with fireplace, and a sitting room. Four bedrooms and three bathrooms, including a master with en-suite. The infinity-edge swimming pool overlooks rolling vineyards and the Chianti hills. An outdoor kitchen and dining area make this perfect for entertaining. Forty-five minutes from Florence.',
    price: 320000, currency: 'USD', country: 'Italy', country_code: 'IT',
    state: 'Tuscany', city: 'Florence', town: 'San Casciano in Val di Pesa',
    bedrooms: 4, bathrooms: 3, building_size: '2,800 sqft', land_size: '2.5 acres',
    parking_spaces: 3, property_type: 'Tuscan Farmhouse', furnished: 'Partially Furnished', listing_status: 'sale',
    year_built: 1850,
    images: newHomeGallery([35325852, 4534508, 4913326, 30484324, 32206234, 30580858, 32579238, 29377845, 30767888, 189472]),
    rating: 4.8, rating_count: 47, favorite_count: 39,
    features: ['Olive Grove', 'Stone Construction', 'Chestnut Beams', 'Terracotta Floors', 'Wood-fired Oven', 'Infinity Pool', 'Vineyard Views', 'Outdoor Kitchen'],
  },
  // 28. Spain — Affordable Apartment
  {
    property_id: 'KCO-000028', listing_type: 'property', category: 'International Homes',
    title: 'Apartment with Catalan Vault Ceiling in Barcelona Gothic Quarter',
    description: 'A distinctive apartment in Barcelona\'s Gothic Quarter, featuring original Catalan vault ceilings and exposed brick walls. The 750 sqft layout includes a bright living area with a small balcony overlooking a historic lane, a compact but fully equipped kitchen, and two comfortable bedrooms sharing one bathroom. The building has a restored lift and a communal rooftop terrace with city views. Steps from Las Ramblas, the Boqueria market, and Barcelona Cathedral. An excellent entry point into one of Europe\'s most vibrant neighbourhoods.',
    price: 165000, currency: 'USD', country: 'Spain', country_code: 'ES',
    state: 'Catalonia', city: 'Barcelona', town: 'Barri Gòtic',
    bedrooms: 2, bathrooms: 1, building_size: '750 sqft', land_size: null,
    parking_spaces: 0, property_type: 'Apartment', furnished: 'Unfurnished', listing_status: 'sale',
    year_built: 1900,
    images: newHomeGallery([6342356, 7031406, 7031407, 32842395, 33537442, 34992776, 3926542, 31434235, 34524318, 19980228]),
    rating: 4.4, rating_count: 35, favorite_count: 22,
    features: ['Catalan Vault Ceiling', 'Exposed Brick', 'Balcony', 'Rooftop Terrace', 'Near Las Ramblas', 'Walk to Beach', 'Air Conditioning', 'Elevator'],
  },
  // 29. Switzerland — Luxury Alpine Chalet
  {
    property_id: 'KCO-000029', listing_type: 'property', category: 'International Homes',
    title: 'Alpine Chalet with Matterhorn Views in Zermatt',
    description: 'An architect-designed 2020 chalet in the car-free alpine resort of Zermatt, offering uninterrupted views of the Matterhorn. The great room features floor-to-ceiling windows, a double-height stone fireplace, and an open chef\'s kitchen with Gaggenau appliances. Six en-suite bedrooms across three levels, each with mountain views. The lower level includes a wellness area with sauna, steam room, and a ski room with boot warmers. Underfloor heating throughout, triple-glazed windows, and a smart home system. A triple garage is accessible via the underground car park tunnel. A rare offering in one of the world\'s premier ski destinations.',
    price: 2800000, currency: 'USD', country: 'Switzerland', country_code: 'CH',
    state: 'Valais', city: 'Zermatt', town: 'Winkelmatten',
    bedrooms: 6, bathrooms: 5, building_size: '4,200 sqft', land_size: '0.8 acres',
    parking_spaces: 3, property_type: 'Alpine Chalet', furnished: 'Fully Furnished', listing_status: 'sale',
    year_built: 2020,
    images: newHomeGallery([7031604, 8082312, 8146330, 34688219, 34887637, 4221389, 4300078, 34574606, 36123565, 20602372]),
    rating: 4.9, rating_count: 29, favorite_count: 44,
    features: ['Matterhorn Views', 'Floor-to-Ceiling Windows', 'Double-Height Fireplace', 'Sauna & Steam Room', 'Ski Room', 'Underfloor Heating', 'Triple Garage', 'Smart Home System'],
  },
  // 30. Sweden — Affordable Scandinavian Cabin
  {
    property_id: 'KCO-000030', listing_type: 'property', category: 'International Homes',
    title: 'Waterfront Scandinavian Cabin in Stockholm Archipelago',
    description: 'A contemporary 2010 Scandinavian cabin on the Stockholm archipelago island of Vaxholm. The open-plan living area features a wood-burning stove, large picture windows, and a designer kitchen with island. Three bedrooms and two bathrooms, with the master opening directly onto the deck. The 0.5-acre plot includes a private dock, a traditional wood-fired sauna by the water\'s edge, and mature pine forest surrounding the property. Triple-glazed windows and superior insulation ensure year-round comfort. A 30-minute ferry from Stockholm city centre. The perfect year-round retreat for nature lovers.',
    price: 245000, currency: 'USD', country: 'Sweden', country_code: 'SE',
    state: 'Stockholm', city: 'Stockholm', town: 'Vaxholm',
    bedrooms: 3, bathrooms: 2, building_size: '1,600 sqft', land_size: '0.5 acres',
    parking_spaces: 1, property_type: 'Scandinavian Cabin', furnished: 'Partially Furnished', listing_status: 'sale',
    year_built: 2010,
    images: newHomeGallery([13956440, 1787034, 18493366, 34946066, 35419464, 4906490, 6186828, 38476210, 6394586, 27626183]),
    rating: 4.6, rating_count: 31, favorite_count: 26,
    features: ['Waterfront', 'Wood-fired Sauna', 'Wood-burning Stove', 'Private Dock', 'Large Deck', 'Triple-Glazed Windows', 'Forest Views', 'Ferry to City'],
  },

  // === SHOWROOM 2 — MEN'S CATEGORY (35 products) ===

  // 36. T-Shirt
  {
    property_id: 'KCO-000036', listing_type: 'product', category: 'Men',
    title: 'Premium Cotton Crew Neck T-Shirt — Heather Grey',
    description: 'A premium 100% combed cotton crew neck t-shirt in heather grey. Features a modern slim fit, reinforced collar, and pre-shrunk fabric for a perfect wash-and-wear experience. Soft, breathable, and versatile for layering or wearing alone. Ethically made and garment-dyed for a unique depth of colour.',
    price: 29, currency: 'USD', country: '', country_code: '',
    brand: 'Atlas Apparel', color: 'Heather Grey', size: 'S–XXL', material: '100% Combed Cotton',
    images: [PEXELS(806626, 1200), PEXELS(2451200, 1000), PEXELS(3760852, 1000), PEXELS(8217400, 1000), PEXELS(8217415, 1000)],
    rating: 4.5, rating_count: 128, favorite_count: 64,
    features: ['Pre-Shrunk', 'Reinforced Collar', 'Breathable', 'Garment-Dyed', 'Modern Slim Fit'],
  },
  // 37. Polo Shirt
  {
    property_id: 'KCO-000037', listing_type: 'product', category: 'Men',
    title: 'Classic Pique Polo Shirt — Navy Blue',
    description: 'A timeless navy blue pique knit polo shirt with a two-button placket and ribbed collar. Made from breathable cotton pique for all-day comfort. The tailored fit sits neatly between slim and regular for a polished look that works from the office to the weekend.',
    price: 49, currency: 'USD', country: '', country_code: '',
    brand: 'Harbor & Co.', color: 'Navy Blue', size: 'S–XXL', material: 'Cotton Pique',
    images: [PEXELS(264726, 1200), PEXELS(10536994, 1000), PEXELS(1736278, 1000), PEXELS(20763273, 1000), PEXELS(10952730, 1000)],
    rating: 4.6, rating_count: 89, favorite_count: 51,
    features: ['Two-Button Placket', 'Ribbed Collar', 'Breathable Pique', 'Tailored Fit'],
  },
  // 38. Dress Shirt
  {
    property_id: 'KCO-000038', listing_type: 'product', category: 'Men',
    title: 'Wrinkle-Resistant Dress Shirt — White',
    description: 'A crisp white dress shirt in wrinkle-resistant twill. Features a spread collar, adjustable barrel cuffs, and a slim fit through the torso. The no-iron fabric stays smooth straight out of the dryer, making it the easiest choice for a sharp office look every day.',
    price: 69, currency: 'USD', country: '', country_code: '',
    brand: 'Westminster', color: 'White', size: '15–18 Neck', material: 'Wrinkle-Resistant Cotton Twill',
    images: [PEXELS(10563910, 1200), PEXELS(11100267, 1000), PEXELS(11585380, 1000), PEXELS(15973340, 1000), PEXELS(30283441, 1000)],
    rating: 4.7, rating_count: 156, favorite_count: 82,
    features: ['No-Iron Fabric', 'Spread Collar', 'Barrel Cuffs', 'Slim Fit'],
  },
  // 39. Casual Shirt
  {
    property_id: 'KCO-000039', listing_type: 'product', category: 'Men',
    title: 'Oxford Button-Down Casual Shirt — Light Blue',
    description: 'A relaxed light blue Oxford button-down shirt with a soft unstructured collar and a straight hem for untucked wear. Woven from breathable cotton Oxford cloth with a slightly roomy fit. A versatile wardrobe staple that pairs with jeans, chinos, or shorts.',
    price: 55, currency: 'USD', country: '', country_code: '',
    brand: 'Brookside', color: 'Light Blue', size: 'S–XXL', material: 'Cotton Oxford',
    images: [PEXELS(30663372, 1200), PEXELS(32969108, 1000), PEXELS(8217461, 1000), PEXELS(9558711, 1000), PEXELS(4842655, 1000)],
    rating: 4.4, rating_count: 73, favorite_count: 38,
    features: ['Button-Down Collar', 'Soft Unstructured', 'Straight Hem', 'Roomy Fit'],
  },
  // 40. Hoodie
  {
    property_id: 'KCO-000040', listing_type: 'product', category: 'Men',
    title: 'Heavyweight Fleece Hoodie — Charcoal Black',
    description: 'A 400gsm heavyweight fleece pullover hoodie in charcoal black. Features a double-layer hood with drawcord, kangaroo pocket, and ribbed cuffs and hem. Brushed interior for warmth and softness. Built to last with reinforced stitching at all stress points.',
    price: 79, currency: 'USD', country: '', country_code: '',
    brand: 'Ironclad', color: 'Charcoal Black', size: 'S–XXL', material: '400gsm Cotton Fleece',
    images: [PEXELS(1634839, 1200), PEXELS(2108816, 1000), PEXELS(8408556, 1000), PEXELS(12039633, 1000), PEXELS(9775732, 1000)],
    rating: 4.7, rating_count: 201, favorite_count: 117,
    features: ['400gsm Heavyweight', 'Double-Layer Hood', 'Kangaroo Pocket', 'Brushed Interior', 'Reinforced Stitching'],
  },
  // 41. Sweatshirt
  {
    property_id: 'KCO-000041', listing_type: 'product', category: 'Men',
    title: 'Crew Neck Sweatshirt — Olive Green',
    description: 'A mid-weight cotton-blend crew neck sweatshirt in olive green. Features a ribbed V-neck inset, ribbed cuffs and waistband, and a fleece-lined interior for warmth without bulk. A clean, minimal design that layers well under jackets or over a tee.',
    price: 65, currency: 'USD', country: '', country_code: '',
    brand: 'Northvale', color: 'Olive Green', size: 'S–XXL', material: 'Cotton-Blend Fleece',
    images: [PEXELS(10133278, 1200), PEXELS(11340657, 1000), PEXELS(8217406, 1000), PEXELS(13431729, 1000), PEXELS(15127546, 1000)],
    rating: 4.5, rating_count: 94, favorite_count: 56,
    features: ['Ribbed V-Neck Inset', 'Fleece-Lined', 'Mid-Weight', 'Minimal Design'],
  },
  // 42. Jacket
  {
    property_id: 'KCO-000042', listing_type: 'product', category: 'Men',
    title: 'Waterproof Bomber Jacket — Matte Black',
    description: 'A matte black waterproof bomber jacket with a full-length zip, ribbed collar and cuffs, and two zippered hand-warmer pockets. The outer shell is seam-sealed for full weather protection while the lightweight insulation keeps you warm without restricting movement. Includes an interior chest pocket.',
    price: 129, currency: 'USD', country: '', country_code: '',
    brand: 'Vanguard', color: 'Matte Black', size: 'S–XXL', material: 'Seam-Sealed Nylon Shell',
    images: [PEXELS(1697570, 1200), PEXELS(11285597, 1000), PEXELS(9286989, 1000), PEXELS(6044143, 1000), PEXELS(11032688, 1000)],
    rating: 4.6, rating_count: 112, favorite_count: 73,
    features: ['Waterproof', 'Seam-Sealed', 'Full-Length Zip', 'Interior Pocket', 'Lightweight Insulation'],
  },
  // 43. Coat
  {
    property_id: 'KCO-000043', listing_type: 'product', category: 'Men',
    title: 'Wool-Blend Overcoat — Camel',
    description: 'A tailored camel wool-blend overcoat with a single-breasted three-button front and notch lapel. Fully lined with two exterior flap pockets and an interior pocket. The mid-length cut falls just below the knee for elegant coverage. A refined outerwear piece for cold-weather sophistication.',
    price: 249, currency: 'USD', country: '', country_code: '',
    brand: 'Donatello', color: 'Camel', size: 'S–XXL', material: '70% Wool / 30% Polyester',
    images: [PEXELS(13122356, 1200), PEXELS(14693247, 1000), PEXELS(19380819, 1000), PEXELS(19807755, 1000), PEXELS(19109162, 1000)],
    rating: 4.8, rating_count: 67, favorite_count: 44,
    features: ['Wool Blend', 'Notch Lapel', 'Fully Lined', 'Mid-Length', 'Three-Button Front'],
  },
  // 44. Blazer
  {
    property_id: 'KCO-000044', listing_type: 'product', category: 'Men',
    title: 'Unstructured Linen Blazer — Sand Beige',
    description: 'An unstructured sand beige linen blazer with a soft natural shoulder and patch pockets. The breathable linen fabric and unlined construction make it ideal for warm-weather events and smart-casual occasions. Features a two-button front and double back vent for ease of movement.',
    price: 189, currency: 'USD', country: '', country_code: '',
    brand: 'Riviera', color: 'Sand Beige', size: 'S–XXL', material: '100% Linen',
    images: [PEXELS(12975963, 1200), PEXELS(19807757, 1000), PEXELS(19133954, 1000), PEXELS(19800418, 1000), PEXELS(6766299, 1000)],
    rating: 4.6, rating_count: 54, favorite_count: 31,
    features: ['Unstructured', 'Patch Pockets', 'Unlined', 'Double Back Vent', 'Breathable Linen'],
  },
  // 45. Suit
  {
    property_id: 'KCO-000045', listing_type: 'product', category: 'Men',
    title: 'Two-Piece Slim Fit Suit — Charcoal Grey',
    description: 'A sharp two-piece suit in charcoal grey with a slim-fit notch-lapel jacket and flat-front trousers. The jacket features a two-button front, side vents, and functional surgeon cuffs. Trousers have a tapered leg with an unfinished hem for custom tailoring. Wrinkle-resistant travel fabric for a crisp look all day.',
    price: 399, currency: 'USD', country: '', country_code: '',
    brand: 'Sartoro', color: 'Charcoal Grey', size: '36–46 Regular', material: 'Wool-Blend Travel Fabric',
    images: [PEXELS(12377231, 1200), PEXELS(12848320, 1000), PEXELS(12911890, 1000), PEXELS(13801831, 1000), PEXELS(1550895, 1000)],
    rating: 4.8, rating_count: 143, favorite_count: 88,
    features: ['Slim Fit', 'Notch Lapel', 'Side Vents', 'Surgeon Cuffs', 'Flat-Front Trousers', 'Wrinkle-Resistant'],
  },
  // 46. Jeans
  {
    property_id: 'KCO-000046', listing_type: 'product', category: 'Men',
    title: 'Slim Fit Stretch Jeans — Indigo Wash',
    description: 'A pair of indigo wash slim fit jeans with a touch of stretch for comfort. Features a mid-rise waist, five-pocket styling, and a tapered leg opening. The dark indigo dye fades naturally with wear for a personalized look. Reinforced stress points and a durable brass button fly.',
    price: 89, currency: 'USD', country: '', country_code: '',
    brand: 'Denim Lab', color: 'Indigo Wash', size: '30–38 Waist', material: '98% Cotton / 2% Elastane',
    images: [PEXELS(1082526, 1200), PEXELS(1365363, 1000), PEXELS(17630811, 1000), PEXELS(17720437, 1000), PEXELS(17720471, 1000)],
    rating: 4.5, rating_count: 187, favorite_count: 102,
    features: ['Slim Fit', 'Stretch Denim', 'Five-Pocket', 'Mid-Rise', 'Tapered Leg'],
  },
  // 47. Trousers
  {
    property_id: 'KCO-000047', listing_type: 'product', category: 'Men',
    title: 'Chino Trousers — Khaki',
    description: 'A versatile pair of khaki chino trousers with a straight leg and a clean flat front. Made from brushed cotton twill with a slight stretch for comfort. Features slant pockets, a button-through back pocket, and a zip fly. A wardrobe essential that transitions from office to weekend effortlessly.',
    price: 65, currency: 'USD', country: '', country_code: '',
    brand: 'Park Lane', color: 'Khaki', size: '30–40 Waist', material: 'Cotton Twill with Stretch',
    images: [PEXELS(17265364, 1200), PEXELS(17720474, 1000), PEXELS(17745134, 1000), PEXELS(18031844, 1000), PEXELS(18186106, 1000)],
    rating: 4.4, rating_count: 76, favorite_count: 42,
    features: ['Straight Leg', 'Flat Front', 'Slant Pockets', 'Stretch Twill', 'Zip Fly'],
  },
  // 48. Cargo Pants
  {
    property_id: 'KCO-000048', listing_type: 'product', category: 'Men',
    title: 'Ripstop Cargo Pants — Forest Green',
    description: 'Durable forest green ripstop cargo pants with six pockets including bellowed leg cargo pockets. The ripstop fabric resists tearing and abrasion, while the gusseted crotch and articulated knees provide full range of motion. Drawcord ankle cinches keep out debris. Built for work and outdoor adventures.',
    price: 75, currency: 'USD', country: '', country_code: '',
    brand: 'Terraform', color: 'Forest Green', size: '30–38 Waist', material: 'Ripstop Cotton',
    images: [PEXELS(10133273, 1200), PEXELS(14428671, 1000), PEXELS(22856154, 1000), PEXELS(26425708, 1000), PEXELS(30415877, 1000)],
    rating: 4.5, rating_count: 98, favorite_count: 61,
    features: ['Ripstop Fabric', 'Six Pockets', 'Articulated Knees', 'Gusseted Crotch', 'Drawcord Ankles'],
  },
  // 49. Joggers
  {
    property_id: 'KCO-000049', listing_type: 'product', category: 'Men',
    title: 'Fleece-Lined Joggers — Slate Grey',
    description: 'Comfortable slate grey joggers with a tapered fit, elastic drawcord waist, and ribbed ankle cuffs. The fleece-lined interior provides warmth and softness, while the four-way stretch fabric moves with you. Two side pockets and a zippered back pocket keep essentials secure. Perfect for lounging or light activity.',
    price: 55, currency: 'USD', country: '', country_code: '',
    brand: 'Pace', color: 'Slate Grey', size: 'S–XXL', material: 'Fleece-Lined Polyester Blend',
    images: [PEXELS(5319371, 1200), PEXELS(5319373, 1000), PEXELS(17135740, 1000), PEXELS(4554337, 1000), PEXELS(5604021, 1000)],
    rating: 4.6, rating_count: 142, favorite_count: 87,
    features: ['Fleece-Lined', 'Four-Way Stretch', 'Drawcord Waist', 'Zip Back Pocket', 'Tapered Fit'],
  },
  // 50. Shorts
  {
    property_id: 'KCO-000050', listing_type: 'product', category: 'Men',
    title: 'Quick-Dry Cargo Shorts — Stone Beige',
    description: 'Lightweight stone beige cargo shorts with a 9-inch inseam and quick-dry fabric. Features six pockets including side cargo pockets with flap closures. The moisture-wicking material and mesh pocket bags keep you cool and dry in hot weather. A built-in webbing belt ensures a perfect fit.',
    price: 45, currency: 'USD', country: '', country_code: '',
    brand: 'Trailhead', color: 'Stone Beige', size: '30–38 Waist', material: 'Quick-Dry Nylon',
    images: [PEXELS(10341113, 1200), PEXELS(10484479, 1000), PEXELS(10506088, 1000), PEXELS(17119884, 1000), PEXELS(10484502, 1000)],
    rating: 4.3, rating_count: 67, favorite_count: 35,
    features: ['Quick-Dry', '9-Inch Inseam', 'Six Pockets', 'Moisture-Wicking', 'Built-In Belt'],
  },
  // 51. Sneakers
  {
    property_id: 'KCO-000051', listing_type: 'product', category: 'Men',
    title: 'Minimal Leather Sneakers — White',
    description: 'A pair of clean white minimal leather sneakers with a cupsole construction and a padded leather lining. The full-grain leather upper is resoleable, and the natural rubber outsole provides reliable grip. A timeless design that pairs with everything from jeans to tailored trousers.',
    price: 119, currency: 'USD', country: '', country_code: '',
    brand: 'Mercer', color: 'White', size: '7–13 US', material: 'Full-Grain Leather',
    images: [PEXELS(2529148, 1200), PEXELS(1456733, 1000), PEXELS(5526492, 1000), PEXELS(5710076, 1000), PEXELS(2579760, 1000)],
    rating: 4.7, rating_count: 213, favorite_count: 134,
    features: ['Full-Grain Leather', 'Resoleable', 'Cupsole Construction', 'Padded Lining', 'Natural Rubber Outsole'],
  },
  // 52. Running Shoes
  {
    property_id: 'KCO-000052', listing_type: 'product', category: 'Men',
    title: 'Cushioned Running Shoes — Neon Yellow',
    description: 'High-performance neon yellow running shoes with a responsive cushioned midsole and a breathable engineered mesh upper. The 8mm drop and rocker geometry promote a smooth stride, while the durable outsole rubber handles road and light trail. Reflective detailing for low-light visibility.',
    price: 139, currency: 'USD', country: '', country_code: '',
    brand: 'Kinetics', color: 'Neon Yellow', size: '7–13 US', material: 'Engineered Mesh / EVA Midsole',
    images: [PEXELS(13450843, 1200), PEXELS(13560373, 1000), PEXELS(13691720, 1000), PEXELS(15229823, 1000), PEXELS(16350687, 1000)],
    rating: 4.6, rating_count: 178, favorite_count: 95,
    features: ['Responsive Cushioning', 'Breathable Mesh', '8mm Drop', 'Rocker Geometry', 'Reflective Detailing'],
  },
  // 53. Boots
  {
    property_id: 'KCO-000053', listing_type: 'product', category: 'Men',
    title: 'Leather Chelsea Boots — Tobacco Brown',
    description: 'A pair of tobacco brown leather Chelsea boots with elastic side gores and a pull-on loop. The Goodyear-welted construction allows resoling for years of wear, and the full-grain leather develops a rich patina over time. A stacked leather heel and rubber forefoot overlay provide traction and durability.',
    price: 189, currency: 'USD', country: '', country_code: '',
    brand: 'Cobblestone', color: 'Tobacco Brown', size: '7–13 US', material: 'Full-Grain Leather',
    images: [PEXELS(27381293, 1200), PEXELS(27352801, 1000), PEXELS(27353347, 1000), PEXELS(2112753, 1000), PEXELS(12210270, 1000)],
    rating: 4.7, rating_count: 96, favorite_count: 58,
    features: ['Goodyear Welted', 'Elastic Side Gores', 'Resoleable', 'Stacked Leather Heel', 'Full-Grain Leather'],
  },
  // 54. Sandals
  {
    property_id: 'KCO-000054', listing_type: 'product', category: 'Men',
    title: 'Leather Slide Sandals — Tan',
    description: 'A pair of tan leather slide sandals with a contoured footbed and a dual-layer leather strap. The molded EVA midsole provides cushioning and arch support, while the durable rubber outsole offers grip on wet and dry surfaces. A comfortable, easy-wear option for warm days.',
    price: 59, currency: 'USD', country: '', country_code: '',
    brand: 'Soleil', color: 'Tan', size: '7–13 US', material: 'Leather / EVA Midsole',
    images: [PEXELS(27113461, 1200), PEXELS(26925251, 1000), PEXELS(26965818, 1000), PEXELS(27046150, 1000), PEXELS(31450985, 1000)],
    rating: 4.4, rating_count: 52, favorite_count: 28,
    features: ['Contoured Footbed', 'Arch Support', 'Dual-Layer Strap', 'Durable Rubber Outsole'],
  },
  // 55. Loafers
  {
    property_id: 'KCO-000055', listing_type: 'product', category: 'Men',
    title: 'Penny Loafers — Burgundy',
    description: 'A pair of burgundy penny loafers with a moccasin-stitched toe and a leather sole. The full-grain leather upper is lined with soft leather for comfort, and the leather-welted construction allows for resoling. A classic design that elevates both casual and tailored outfits.',
    price: 159, currency: 'USD', country: '', country_code: '',
    brand: 'Bellini', color: 'Burgundy', size: '7–13 US', material: 'Full-Grain Leather',
    images: [PEXELS(7413278, 1200), PEXELS(27063078, 1000), PEXELS(31935085, 1000), PEXELS(31935098, 1000), PEXELS(2929281, 1000)],
    rating: 4.6, rating_count: 71, favorite_count: 39,
    features: ['Moccasin-Stitched Toe', 'Leather Lined', 'Leather-Welted', 'Resoleable'],
  },
  // 56. Watches
  {
    property_id: 'KCO-000056', listing_type: 'product', category: 'Men',
    title: 'Automatic Dive Watch — Steel Blue Dial',
    description: 'A stainless steel automatic dive watch with a steel blue dial, 200m water resistance, and a sapphire crystal. The 40mm case houses a self-winding movement with a 42-hour power reserve. Features a unidirectional ceramic bezel, luminous hands and markers, and a solid steel bracelet with a diver extension. A precision instrument built for adventure.',
    price: 449, currency: 'USD', country: '', country_code: '',
    brand: 'Meridian', color: 'Steel Blue', size: '40mm Case', material: 'Stainless Steel / Sapphire',
    images: [PEXELS(11263067, 1200), PEXELS(14691505, 1000), PEXELS(15710086, 1000), PEXELS(167703, 1000), PEXELS(14808296, 1000)],
    rating: 4.8, rating_count: 167, favorite_count: 112,
    features: ['Automatic Movement', '200m Water Resistance', 'Sapphire Crystal', 'Ceramic Bezel', '42h Power Reserve', 'Diver Extension'],
  },
  // 57. Wallets
  {
    property_id: 'KCO-000057', listing_type: 'product', category: 'Men',
    title: 'Slim Bifold Leather Wallet — Cognac',
    description: 'A slim cognac brown bifold wallet handcrafted from full-grain leather. Features six card slots, a full-length cash pocket, and a quick-access ID window. The minimalist profile slips easily into a front pocket without bulk. Vegetable-tanned leather that ages beautifully with use.',
    price: 79, currency: 'USD', country: '', country_code: '',
    brand: 'Hide & Stitch', color: 'Cognac Brown', size: '4.5" x 3.25"', material: 'Full-Grain Vegetable-Tanned Leather',
    images: [PEXELS(14401958, 1200), PEXELS(14402037, 1000), PEXELS(14402038, 1000), PEXELS(14402040, 1000), PEXELS(14402041, 1000)],
    rating: 4.7, rating_count: 134, favorite_count: 78,
    features: ['Six Card Slots', 'ID Window', 'Full-Length Cash Pocket', 'Vegetable-Tanned', 'Slim Profile'],
  },
  // 58. Belts
  {
    property_id: 'KCO-000058', listing_type: 'product', category: 'Men',
    title: 'Full-Grain Leather Belt — Espresso Brown',
    description: 'An espresso brown full-grain leather belt with a solid brass roller buckle. The 1.25-inch width suits both jeans and trousers, and the single-prong roller design makes sizing easy. Cut from a single strip of leather with no fillers or bonded layers for lasting durability.',
    price: 49, currency: 'USD', country: '', country_code: '',
    brand: 'Hide & Stitch', color: 'Espresso Brown', size: '30–42 Waist', material: 'Full-Grain Leather / Brass',
    images: [PEXELS(31367059, 1200), PEXELS(31367060, 1000), PEXELS(31959214, 1000), PEXELS(31959215, 1000), PEXELS(31959216, 1000)],
    rating: 4.6, rating_count: 88, favorite_count: 47,
    features: ['Full-Grain Leather', 'Solid Brass Buckle', '1.25" Width', 'Single Strip', 'Roller Buckle'],
  },
  // 59. Sunglasses
  {
    property_id: 'KCO-000059', listing_type: 'product', category: 'Men',
    title: 'Polarized Aviator Sunglasses — Gold Frame',
    description: 'A pair of gold-framed aviator sunglasses with green polarized lenses. The lightweight metal frame features adjustable nose pads and temple tips for a custom fit. Polarized lenses reduce glare and provide 100% UV protection. Includes a hard case and microfiber cleaning pouch.',
    price: 129, currency: 'USD', country: '', country_code: '',
    brand: 'Solis', color: 'Gold / Green', size: '58mm Lens', material: 'Metal Frame / Polarized Glass',
    images: [PEXELS(121795, 1200), PEXELS(7013278, 1000), PEXELS(1461048, 1000), PEXELS(1013482, 1000), PEXELS(10837797, 1000)],
    rating: 4.6, rating_count: 145, favorite_count: 83,
    features: ['Polarized Lenses', '100% UV Protection', 'Adjustable Nose Pads', 'Lightweight Metal Frame', 'Hard Case Included'],
  },
  // 60. Caps
  {
    property_id: 'KCO-000060', listing_type: 'product', category: 'Men',
    title: 'Six-Panel Dad Cap — Washed Black',
    description: 'A washed black six-panel dad cap with a curved brim and an unstructured crown for a broken-in look. The cotton twill fabric softens with every wash, and the metal back buckle allows for an adjustable fit. A subtle embroidered logo sits on the left side panel.',
    price: 35, currency: 'USD', country: '', country_code: '',
    brand: 'Atlas Apparel', color: 'Washed Black', size: 'Adjustable', material: 'Cotton Twill',
    images: [PEXELS(185765, 1200), PEXELS(9558770, 1000), PEXELS(187881, 1000), PEXELS(211048, 1000), PEXELS(13900627, 1000)],
    rating: 4.4, rating_count: 76, favorite_count: 44,
    features: ['Six-Panel', 'Curved Brim', 'Unstructured Crown', 'Metal Buckle', 'Washed Cotton Twill'],
  },
  // 61. Hats
  {
    property_id: 'KCO-000061', listing_type: 'product', category: 'Men',
    title: 'Felt Fedora Hat — Charcoal Grey',
    description: 'A charcoal grey felt fedora with a grosgrain ribbon band and a structured center-dent crown. The wool felt is water-resistant and holds its shape beautifully. Features a raw-edge brim and an interior leather sweatband for comfort. A timeless accessory that adds polish to any outfit.',
    price: 89, currency: 'USD', country: '', country_code: '',
    brand: 'Donatello', color: 'Charcoal Grey', size: 'S–XL', material: 'Wool Felt',
    images: [PEXELS(12551957, 1200), PEXELS(16766943, 1000), PEXELS(465960, 1000), PEXELS(26873540, 1000), PEXELS(28128058, 1000)],
    rating: 4.5, rating_count: 61, favorite_count: 33,
    features: ['Wool Felt', 'Center-Dent Crown', 'Grosgrain Band', 'Raw-Edge Brim', 'Leather Sweatband'],
  },
  // 62. Backpacks
  {
    property_id: 'KCO-000062', listing_type: 'product', category: 'Men',
    title: 'Waterproof Commuter Backpack — Graphite',
    description: 'A 24L graphite waterproof commuter backpack with a padded 15-inch laptop compartment and a luggage pass-through strap. The roll-top closure keeps contents dry in any weather, and the air-mesh back panel prevents overheating. Includes a hidden anti-theft pocket and reflective accents for low-light visibility.',
    price: 149, currency: 'USD', country: '', country_code: '',
    brand: 'Vanguard', color: 'Graphite', size: '24L', material: 'TPU-Coated Nylon',
    images: [PEXELS(12067501, 1200), PEXELS(15806857, 1000), PEXELS(19850113, 1000), PEXELS(27869785, 1000), PEXELS(22434759, 1000)],
    rating: 4.7, rating_count: 198, favorite_count: 121,
    features: ['Waterproof', '15" Laptop Compartment', 'Roll-Top Closure', 'Anti-Theft Pocket', 'Reflective Accents', 'Luggage Pass-Through'],
  },
  // 63. Travel Bags
  {
    property_id: 'KCO-000063', listing_type: 'product', category: 'Men',
    title: 'Leather Duffel Travel Bag — Dark Brown',
    description: 'A 45L dark brown full-grain leather duffel bag with a detachable shoulder strap and dual carry handles. The spacious main compartment fits a weekend worth of essentials, with an interior zip pocket and a separate shoe compartment. Solid brass hardware and a cotton-twill lining. Built to last for years of travel.',
    price: 299, currency: 'USD', country: '', country_code: '',
    brand: 'Cobblestone', color: 'Dark Brown', size: '45L', material: 'Full-Grain Leather / Brass',
    images: [PEXELS(28726897, 1200), PEXELS(28758346, 1000), PEXELS(35101279, 1000), PEXELS(36462069, 1000), PEXELS(36687007, 1000)],
    rating: 4.8, rating_count: 87, favorite_count: 56,
    features: ['Full-Grain Leather', '45L Capacity', 'Detachable Strap', 'Shoe Compartment', 'Brass Hardware', 'Twill Lining'],
  },
  // 64. Bracelets
  {
    property_id: 'KCO-000064', listing_type: 'product', category: 'Men',
    title: 'Braided Leather Bracelet with Steel Clasp — Black',
    description: 'A black braided leather bracelet with a stainless steel magnetic clasp. The multi-strand braid gives a substantial look while remaining lightweight. The stainless steel clasp is hypoallergenic and secure. A versatile accessory that adds edge to both casual and smart outfits.',
    price: 39, currency: 'USD', country: '', country_code: '',
    brand: 'Meridian', color: 'Black', size: '7.5"–8.5"', material: 'Braided Leather / Stainless Steel',
    images: [PEXELS(12194338, 1200), PEXELS(12194336, 1000), PEXELS(12194298, 1000), PEXELS(10023037, 1000), PEXELS(1302623, 1000)],
    rating: 4.4, rating_count: 58, favorite_count: 31,
    features: ['Braided Leather', 'Magnetic Clasp', 'Hypoallergenic', 'Multi-Strand Braid'],
  },
  // 65. Necklaces
  {
    property_id: 'KCO-000065', listing_type: 'product', category: 'Men',
    title: 'Stainless Steel Dog Tag Necklace — Silver',
    description: 'A silver stainless steel dog tag necklace with a 24-inch ball chain. The tag is deeply engraved with a subtle geometric pattern and can be custom-engraved on the reverse. Hypoallergenic and tarnish-resistant. A modern take on a classic design.',
    price: 45, currency: 'USD', country: '', country_code: '',
    brand: 'Meridian', color: 'Silver', size: '24" Chain', material: 'Stainless Steel',
    images: [PEXELS(7134458, 1200), PEXELS(16109182, 1000), PEXELS(15691510, 1000), PEXELS(12421547, 1000), PEXELS(18609432, 1000)],
    rating: 4.5, rating_count: 64, favorite_count: 37,
    features: ['Stainless Steel', '24" Ball Chain', 'Engravable', 'Hypoallergenic', 'Tarnish-Resistant'],
  },
  // 66. Rings
  {
    property_id: 'KCO-000066', listing_type: 'product', category: 'Men',
    title: 'Tungsten Carbide Ring with Carbon Fiber Inlay — Gunmetal',
    description: 'A gunmetal tungsten carbide ring with a carbon fiber inlay and a brushed finish. The 8mm comfort-fit band is scratch-resistant and hypoallergenic. Tungsten carbide is one of the hardest metals used in jewelry, ensuring this ring maintains its finish for life. A bold, modern statement ring.',
    price: 89, currency: 'USD', country: '', country_code: '',
    brand: 'Meridian', color: 'Gunmetal', size: '7–13', material: 'Tungsten Carbide / Carbon Fiber',
    images: [PEXELS(10164658, 1200), PEXELS(10526289, 1000), PEXELS(12753202, 1000), PEXELS(12133990, 1000), PEXELS(13155692, 1000)],
    rating: 4.7, rating_count: 92, favorite_count: 61,
    features: ['Tungsten Carbide', 'Carbon Fiber Inlay', '8mm Comfort Fit', 'Scratch-Resistant', 'Hypoallergenic'],
  },
  // 67. Perfumes
  {
    property_id: 'KCO-000067', listing_type: 'product', category: 'Men',
    title: 'Eau de Parfum — Oud & Amber 100ml',
    description: 'A 100ml eau de parfum with a warm, woody scent profile. Top notes of bergamot and pink pepper give way to a heart of oud and leather, with a base of amber, sandalwood, and musk. Long-lasting projection with moderate sillage. Presented in a weighted glass bottle with a magnetic cap.',
    price: 119, currency: 'USD', country: '', country_code: '',
    brand: 'Maison Noir', color: 'Amber Glass', size: '100ml', material: 'Eau de Parfum',
    images: [PEXELS(16089870, 1200), PEXELS(3785784, 1000), PEXELS(12461865, 1000), PEXELS(14211239, 1000), PEXELS(14490634, 1000)],
    rating: 4.6, rating_count: 156, favorite_count: 94,
    features: ['100ml', 'Oud & Amber', 'Long-Lasting', 'Magnetic Cap', 'Weighted Glass Bottle'],
  },
  // 68. Beard Care
  {
    property_id: 'KCO-000068', listing_type: 'product', category: 'Men',
    title: 'Beard Oil Kit — Cedar & Sandalwood',
    description: 'A complete beard care kit featuring a 30ml cedar and sandalwood beard oil, a boar bristle brush, and a wooden comb. The oil blend of argan and jojoba softens coarse hair and moisturizes the skin beneath. The boar bristle brush distributes oils evenly for a healthy shine. A perfect gift set.',
    price: 45, currency: 'USD', country: '', country_code: '',
    brand: 'Beard & Blade', color: 'Natural Wood', size: '30ml Oil', material: 'Argan / Jojoba / Boar Bristle',
    images: [PEXELS(3809173, 1200), PEXELS(905186, 1000), PEXELS(28557815, 1000), PEXELS(28664165, 1000), PEXELS(30263576, 1000)],
    rating: 4.5, rating_count: 113, favorite_count: 67,
    features: ['30ml Beard Oil', 'Boar Bristle Brush', 'Wooden Comb', 'Cedar & Sandalwood', 'Argan & Jojoba'],
  },
  // 69. Grooming Kits
  {
    property_id: 'KCO-000069', listing_type: 'product', category: 'Men',
    title: 'Complete Grooming Kit — 7 Piece Stainless Steel Set',
    description: 'A 7-piece stainless steel grooming kit including a nail clipper, toenail clipper, tweezers, scissors, a file, an ear pick, and a comb. All tools are made from surgical-grade stainless steel and come in a compact leather-look travel case. A practical and elegant set for daily or travel use.',
    price: 69, currency: 'USD', country: '', country_code: '',
    brand: 'Beard & Blade', color: 'Silver / Black Case', size: '7 Pieces', material: 'Surgical Stainless Steel',
    images: [PEXELS(6560380, 1200), PEXELS(36043168, 1000), PEXELS(32630376, 1000), PEXELS(32630382, 1000), PEXELS(32645070, 1000)],
    rating: 4.6, rating_count: 98, favorite_count: 52,
    features: ['7 Pieces', 'Surgical Steel', 'Travel Case', 'Nail Clipper', 'Tweezers', 'Scissors'],
  },
  // 70. Hair Clippers
  {
    property_id: 'KCO-000070', listing_type: 'product', category: 'Men',
    title: 'Cordless Hair Clipper with Titanium Blades',
    description: 'A cordless hair clipper with self-sharpening titanium blades and a digital motor for smooth, snag-free cutting. The lithium-ion battery provides 4 hours of runtime on a 2-hour charge. Includes 8 guide combs (1–8mm), a styling comb, scissors, and a cleaning brush. An LCD battery indicator keeps you informed.',
    price: 89, currency: 'USD', country: '', country_code: '',
    brand: 'Beard & Blade', color: 'Black / Silver', size: '8 Guide Combs', material: 'Titanium Blades',
    images: [PEXELS(10517484, 1200), PEXELS(10775080, 1000), PEXELS(16407082, 1000), PEXELS(18503633, 1000), PEXELS(11424756, 1000)],
    rating: 4.7, rating_count: 187, favorite_count: 103,
    features: ['Cordless', 'Titanium Blades', '4h Battery', '8 Guide Combs', 'LCD Indicator', 'Digital Motor'],
  },
  // === SHOWROOM 2 — WOMEN'S CATEGORY (35 products) ===

  // 71. Midi Dress
  {
    property_id: 'KCO-000071', listing_type: 'product', category: 'Women',
    title: 'Floral Wrap Midi Dress — Sage Green',
    description: 'A flowing sage green floral wrap midi dress with a V-neckline and adjustable tie waist. The lightweight crepe fabric drapes beautifully and features a delicate floral print throughout. Three-quarter sleeves and a fluted hem create a flattering silhouette. Perfect for brunches, garden parties, or evening dinners.',
    price: 79, currency: 'USD', country: '', country_code: '',
    brand: 'Elara', color: 'Sage Green', size: 'XS–XL', material: 'Polyester Crepe',
    images: [PEXELS(16564645, 1200), PEXELS(20042388, 1000), PEXELS(19169118, 1000), PEXELS(13262229, 1000), PEXELS(15728392, 1000)],
    rating: 4.6, rating_count: 142, favorite_count: 89,
    features: ['Wrap Style', 'V-Neckline', 'Adjustable Tie Waist', 'Three-Quarter Sleeves', 'Floral Print'],
  },
  // 72. Maxi Dress
  {
    property_id: 'KCO-000072', listing_type: 'product', category: 'Women',
    title: 'Boho Tiered Maxi Dress — Terracotta',
    description: 'A tiered bohemian maxi dress in warm terracotta with a smocked bodice and ruffle hem. The breathable rayon fabric flows with every step, while the adjustable spaghetti straps ensure a comfortable fit. A versatile piece that transitions from beach days to sunset dinners effortlessly.',
    price: 89, currency: 'USD', country: '', country_code: '',
    brand: 'Maison Elara', color: 'Terracotta', size: 'XS–XL', material: 'Rayon',
    images: [PEXELS(6208958, 1200), PEXELS(18089994, 1000), PEXELS(6208980, 1000), PEXELS(8468773, 1000), PEXELS(31247347, 1000)],
    rating: 4.7, rating_count: 98, favorite_count: 67,
    features: ['Tiered Design', 'Smocked Bodice', 'Spaghetti Straps', 'Ruffle Hem', 'Boho Style'],
  },
  // 73. Evening Gown
  {
    property_id: 'KCO-000073', listing_type: 'product', category: 'Women',
    title: 'Sequin Evening Gown — Champagne Gold',
    description: 'A show-stopping champagne gold sequin evening gown with a plunging V-neck and an open back. The form-fitting silhouette is fully lined for comfort, with hidden side pockets for convenience. The all-over sequin detailing catches light from every angle. A red-carpet-ready statement piece.',
    price: 249, currency: 'USD', country: '', country_code: '',
    brand: 'Lumière', color: 'Champagne Gold', size: 'XS–L', material: 'Sequin Mesh',
    images: [PEXELS(21787515, 1200), PEXELS(33198034, 1000), PEXELS(6716444, 1000), PEXELS(16918130, 1000), PEXELS(29675498, 1000)],
    rating: 4.8, rating_count: 76, favorite_count: 54,
    features: ['All-Over Sequins', 'Plunging V-Neck', 'Open Back', 'Hidden Pockets', 'Fully Lined'],
  },
  // 74. Cocktail Dress
  {
    property_id: 'KCO-000074', listing_type: 'product', category: 'Women',
    title: 'Fit & Flare Cocktail Dress — Burgundy',
    description: 'A classic burgundy fit-and-flare cocktail dress with a sweetheart neckline and a knee-length flared skirt. The structured bodice provides support without a bra, and the invisible back zip ensures a smooth fit. Crafted from a comfortable ponte knit that holds its shape all evening. Timeless elegance for any special occasion.',
    price: 129, currency: 'USD', country: '', country_code: '',
    brand: 'Soirée', color: 'Burgundy', size: 'XS–XL', material: 'Ponte Knit',
    images: [PEXELS(13946076, 1200), PEXELS(14788388, 1000), PEXELS(14473450, 1000), PEXELS(4735943, 1000), PEXELS(20377674, 1000)],
    rating: 4.7, rating_count: 113, favorite_count: 71,
    features: ['Sweetheart Neckline', 'Fit & Flare', 'Structured Bodice', 'Invisible Zip', 'Knee Length'],
  },
  // 75. Blouse
  {
    property_id: 'KCO-000075', listing_type: 'product', category: 'Women',
    title: 'Silk Blend Tie-Neck Blouse — Ivory',
    description: 'An ivory silk-blend blouse with a removable tie-neck and bishop sleeves. The lightweight fabric has a subtle sheen and a fluid drape. Features a hidden button placket and French cuffs. An elegant piece that elevates both tailored trousers and pencil skirts for the office or evening.',
    price: 95, currency: 'USD', country: '', country_code: '',
    brand: 'Atelier Blanc', color: 'Ivory', size: 'XS–XL', material: 'Silk Blend',
    images: [PEXELS(16378441, 1200), PEXELS(19995460, 1000), PEXELS(17984122, 1000), PEXELS(36701796, 1000), PEXELS(8250562, 1000)],
    rating: 4.5, rating_count: 87, favorite_count: 48,
    features: ['Removable Tie Neck', 'Bishop Sleeves', 'Hidden Placket', 'French Cuffs', 'Silk Blend'],
  },
  // 76. T-Shirt
  {
    property_id: 'KCO-000076', listing_type: 'product', category: 'Women',
    title: 'Relaxed V-Neck Tee — Dusty Rose',
    description: 'A relaxed-fit dusty rose V-neck tee made from ultra-soft supima cotton. The slightly dropped shoulders and curved hem create an effortless silhouette. Pre-washed for a lived-in feel from the first wear. A versatile everyday essential that pairs with everything from jeans to skirts.',
    price: 32, currency: 'USD', country: '', country_code: '',
    brand: 'Daily Thread', color: 'Dusty Rose', size: 'XS–XXL', material: 'Supima Cotton',
    images: [PEXELS(8335751, 1200), PEXELS(33621236, 1000), PEXELS(15796687, 1000), PEXELS(19169214, 1000), PEXELS(22674401, 1000)],
    rating: 4.4, rating_count: 156, favorite_count: 82,
    features: ['Supima Cotton', 'V-Neck', 'Dropped Shoulders', 'Curved Hem', 'Pre-Washed'],
  },
  // 77. Crop Top
  {
    property_id: 'KCO-000077', listing_type: 'product', category: 'Women',
    title: 'Ribbed Knit Crop Top — Black',
    description: 'A black ribbed knit crop top with a square neckline and fitted silhouette. The soft stretch cotton-blend contours the body while remaining breathable. Features a raw-edge hem for a modern look. Perfect for high-waisted jeans, skirts, or layering under blazers.',
    price: 28, currency: 'USD', country: '', country_code: '',
    brand: 'Form & Function', color: 'Black', size: 'XS–L', material: 'Cotton-Blend Ribbed Knit',
    images: [PEXELS(19109136, 1200), PEXELS(4652603, 1000), PEXELS(3955034, 1000), PEXELS(8427633, 1000), PEXELS(21839243, 1000)],
    rating: 4.5, rating_count: 134, favorite_count: 91,
    features: ['Square Neckline', 'Ribbed Knit', 'Raw-Edge Hem', 'Stretch Fit', 'Breathable'],
  },
  // 78. Hoodie
  {
    property_id: 'KCO-000078', listing_type: 'product', category: 'Women',
    title: 'Oversized Fleece Hoodie — Lavender',
    description: 'An oversized lavender fleece hoodie with a drop-shoulder silhouette and a roomy kangaroo pocket. The brushed-back interior is incredibly soft against the skin, and the double-layer hood provides extra warmth. Ribbed cuffs and a relaxed hem create a cozy, laid-back fit. Perfect for lounging or weekend outings.',
    price: 65, currency: 'USD', country: '', country_code: '',
    brand: 'Cloud Nine', color: 'Lavender', size: 'XS–XL', material: 'Brushed Fleece',
    images: [PEXELS(19289548, 1200), PEXELS(22434771, 1000), PEXELS(22434756, 1000), PEXELS(22434764, 1000), PEXELS(22432983, 1000)],
    rating: 4.6, rating_count: 178, favorite_count: 112,
    features: ['Oversized Fit', 'Drop Shoulder', 'Double-Layer Hood', 'Kangaroo Pocket', 'Brushed Interior'],
  },
  // 79. Blazer
  {
    property_id: 'KCO-000079', listing_type: 'product', category: 'Women',
    title: 'Double-Breasted Blazer — Camel',
    description: 'A tailored camel double-breasted blazer with gold buttons and a nipped-in waist. The structured shoulders and full lining create a polished silhouette, while the stretch wool-blend fabric allows comfortable movement. Features flap pockets and a single back vent. A power piece for the office or evening events.',
    price: 169, currency: 'USD', country: '', country_code: '',
    brand: 'Sartoro', color: 'Camel', size: 'XS–XL', material: 'Wool Blend with Stretch',
    images: [PEXELS(17938771, 1200), PEXELS(22432988, 1000), PEXELS(7440056, 1000), PEXELS(13573918, 1000), PEXELS(14656326, 1000)],
    rating: 4.7, rating_count: 92, favorite_count: 58,
    features: ['Double-Breasted', 'Gold Buttons', 'Nipped Waist', 'Fully Lined', 'Stretch Wool Blend'],
  },
  // 80. Wool Coat
  {
    property_id: 'KCO-000080', listing_type: 'product', category: 'Women',
    title: 'Belted Wool Wrap Coat — Camel',
    description: 'A camel belted wool wrap coat with a shawl collar and a self-tie waist. The double-faced wool is warm without bulk, and the longline silhouette falls below the knee. Features two front patch pockets and a relaxed open front. A timeless outerwear investment that elevates any winter outfit.',
    price: 299, currency: 'USD', country: '', country_code: '',
    brand: 'Donatello', color: 'Camel', size: 'XS–XL', material: 'Double-Faced Wool',
    images: [PEXELS(29611520, 1200), PEXELS(29611521, 1000), PEXELS(7440053, 1000), PEXELS(179909, 1000), PEXELS(20139605, 1000)],
    rating: 4.8, rating_count: 64, favorite_count: 42,
    features: ['Double-Faced Wool', 'Shawl Collar', 'Self-Tie Waist', 'Patch Pockets', 'Longline'],
  },
  // 81. Skinny Jeans
  {
    property_id: 'KCO-000081', listing_type: 'product', category: 'Women',
    title: 'High-Rise Skinny Jeans — Black',
    description: 'Black high-rise skinny jeans with powerful stretch denim that sculpts and holds its shape. The five-pocket design and a flattering high waist create a streamlined silhouette. Features a comfortable stretch blend that moves with you. A versatile wardrobe staple that works for day or night.',
    price: 79, currency: 'USD', country: '', country_code: '',
    brand: 'Denim Lab', color: 'Black', size: '24–34', material: 'Stretch Cotton Denim',
    images: [PEXELS(10557834, 1200), PEXELS(16841001, 1000), PEXELS(27641317, 1000), PEXELS(15417317, 1000), PEXELS(14513896, 1000)],
    rating: 4.5, rating_count: 203, favorite_count: 128,
    features: ['High Rise', 'Power Stretch', 'Five Pockets', 'Sculpting Fit', 'Black Wash'],
  },
  // 82. Wide-Leg Jeans
  {
    property_id: 'KCO-000082', listing_type: 'product', category: 'Women',
    title: 'Wide-Leg Jeans — Light Blue Wash',
    description: 'Relaxed wide-leg jeans in a vintage light blue wash. The high waist and full-length wide leg create a fashion-forward silhouette inspired by 90s denim. Made from rigid cotton denim that breaks in beautifully with wear. Features a classic five-pocket design and a button fly.',
    price: 89, currency: 'USD', country: '', country_code: '',
    brand: 'Denim Lab', color: 'Light Blue Wash', size: '24–34', material: '100% Cotton Denim',
    images: [PEXELS(30590661, 1200), PEXELS(8030150, 1000), PEXELS(8031785, 1000), PEXELS(30721139, 1000), PEXELS(8387814, 1000)],
    rating: 4.4, rating_count: 117, favorite_count: 73,
    features: ['Wide Leg', 'High Waist', 'Vintage Wash', 'Button Fly', 'Rigid Denim'],
  },
  // 83. Leggings
  {
    property_id: 'KCO-000083', listing_type: 'product', category: 'Women',
    title: 'High-Waist Yoga Leggings — Black',
    description: 'Black high-waist yoga leggings with a hidden pocket in the waistband and a seamless gusset for comfort. The four-way stretch fabric is squat-proof and moisture-wicking. A 28-inch inseam with a clean hem. Perfect for yoga, pilates, or everyday wear.',
    price: 49, currency: 'USD', country: '', country_code: '',
    brand: 'Pace', color: 'Black', size: 'XS–XL', material: 'Four-Way Stretch Nylon-Spandex',
    images: [PEXELS(31096472, 1200), PEXELS(26050629, 1000), PEXELS(15957898, 1000), PEXELS(27789249, 1000), PEXELS(17904666, 1000)],
    rating: 4.6, rating_count: 289, favorite_count: 176,
    features: ['High Waist', 'Squat-Proof', 'Hidden Pocket', 'Moisture-Wicking', 'Four-Way Stretch'],
  },
  // 84. Midi Skirt
  {
    property_id: 'KCO-000084', listing_type: 'product', category: 'Women',
    title: 'Pleated Satin Midi Skirt — Emerald',
    description: 'An emerald green pleated satin midi skirt with an elastic waistband for all-day comfort. The silky satin fabric catches the light with every movement, and the accordion pleats create beautiful volume. Falls to mid-calf length. Pairs effortlessly with sweaters, blouses, or crop tops.',
    price: 69, currency: 'USD', country: '', country_code: '',
    brand: 'Elara', color: 'Emerald', size: 'XS–XL', material: 'Satin Polyester',
    images: [PEXELS(27113465, 1200), PEXELS(27046151, 1000), PEXELS(3682290, 1000), PEXELS(27204307, 1000), PEXELS(1878821, 1000)],
    rating: 4.5, rating_count: 84, favorite_count: 52,
    features: ['Accordion Pleats', 'Elastic Waistband', 'Satin Finish', 'Midi Length', 'Lightweight'],
  },
  // 85. Jumpsuit
  {
    property_id: 'KCO-000085', listing_type: 'product', category: 'Women',
    title: 'Wide-Leg Jumpsuit — Navy',
    description: 'A navy wide-leg jumpsuit with a halter neckline and an open back. The flowing crepe fabric drapes elegantly, while the fitted waist with a self-belt defines the silhouette. Features side pockets and a concealed back zip. An effortless one-piece outfit for events or evenings out.',
    price: 109, currency: 'USD', country: '', country_code: '',
    brand: 'Soirée', color: 'Navy', size: 'XS–XL', material: 'Polyester Crepe',
    images: [PEXELS(27046143, 1200), PEXELS(1228624, 1000), PEXELS(1204464, 1000), PEXELS(27174557, 1000), PEXELS(27046146, 1000)],
    rating: 4.6, rating_count: 71, favorite_count: 44,
    features: ['Halter Neckline', 'Open Back', 'Self-Belt', 'Side Pockets', 'Wide Leg'],
  },
  // 86. Tote Bag
  {
    property_id: 'KCO-000086', listing_type: 'product', category: 'Women',
    title: 'Structured Leather Tote Bag — Caramel',
    description: 'A structured caramel leather tote bag with gold hardware and a magnetic closure. The spacious main compartment includes a padded laptop sleeve and two slip pockets. Rolled leather handles with a 10-inch drop and an optional shoulder strap. Crafted from full-grain leather that develops a beautiful patina.',
    price: 199, currency: 'USD', country: '', country_code: '',
    brand: 'Hide & Stitch', color: 'Caramel', size: '16" x 12" x 5"', material: 'Full-Grain Leather',
    images: [PEXELS(1427957, 1200), PEXELS(34089129, 1000), PEXELS(28843746, 1000), PEXELS(33077018, 1000), PEXELS(28843739, 1000)],
    rating: 4.7, rating_count: 156, favorite_count: 98,
    features: ['Full-Grain Leather', 'Laptop Sleeve', 'Gold Hardware', 'Magnetic Closure', 'Optional Strap'],
  },
  // 87. Crossbody Bag
  {
    property_id: 'KCO-000087', listing_type: 'product', category: 'Women',
    title: 'Quilted Crossbody Bag — Blush Pink',
    description: 'A blush pink quilted crossbody bag with a chain-link shoulder strap and a magnetic flap closure. The compact interior includes card slots and a zip pocket. The diamond-quilted exterior adds texture and sophistication. A versatile everyday bag that transitions from day to night effortlessly.',
    price: 129, currency: 'USD', country: '', country_code: '',
    brand: 'Lumière', color: 'Blush Pink', size: '9" x 6" x 2.5"', material: 'Vegan Leather',
    images: [PEXELS(33077019, 1200), PEXELS(26791734, 1000), PEXELS(12194386, 1000), PEXELS(16124761, 1000), PEXELS(9286986, 1000)],
    rating: 4.6, rating_count: 108, favorite_count: 74,
    features: ['Quilted Design', 'Chain Strap', 'Magnetic Flap', 'Card Slots', 'Compact Size'],
  },
  // 88. High Heels
  {
    property_id: 'KCO-000088', listing_type: 'product', category: 'Women',
    title: 'Pointed-Toe Stiletto Heels — Nude',
    description: 'A pair of nude pointed-toe stiletto heels with a 4-inch heel and a padded leather insole. The sleek silhouette elongates the leg, while the cushioned footbed provides all-day comfort. Features a smooth leather upper and a non-slip outsole. An elegant essential for work, events, or evenings.',
    price: 149, currency: 'USD', country: '', country_code: '',
    brand: 'Bellini', color: 'Nude', size: '5–11 US', material: 'Leather Upper',
    images: [PEXELS(28821783, 1200), PEXELS(27100519, 1000), PEXELS(27204296, 1000), PEXELS(27100516, 1000), PEXELS(27100521, 1000)],
    rating: 4.5, rating_count: 143, favorite_count: 87,
    features: ['4" Stiletto Heel', 'Pointed Toe', 'Padded Insole', 'Non-Slip Outsole', 'Leather Upper'],
  },
  // 89. Sneakers
  {
    property_id: 'KCO-000089', listing_type: 'product', category: 'Women',
    title: 'Slip-On Canvas Sneakers — White',
    description: 'A pair of white slip-on canvas sneakers with a memory-foam insole and a flexible rubber outsole. The breathable cotton canvas upper keeps feet cool, while the elastic side panels provide a snug fit without laces. A lightweight, go-anywhere sneaker that pairs with everything from jeans to dresses.',
    price: 59, currency: 'USD', country: '', country_code: '',
    brand: 'Mercer', color: 'White', size: '5–11 US', material: 'Canvas / Rubber',
    images: [PEXELS(7588506, 1200), PEXELS(35182320, 1000), PEXELS(17794429, 1000), PEXELS(9722378, 1000), PEXELS(17244567, 1000)],
    rating: 4.4, rating_count: 198, favorite_count: 124,
    features: ['Slip-On Design', 'Memory Foam Insole', 'Breathable Canvas', 'Flexible Outsole', 'No Laces'],
  },
  // 90. Ankle Boots
  {
    property_id: 'KCO-000090', listing_type: 'product', category: 'Women',
    title: 'Suede Ankle Boots — Taupe',
    description: 'Taupe suede ankle boots with a block heel and a side zip closure. The cushioned footbed and flexible outsole provide all-day comfort, while the almond toe creates a flattering shape. Features a soft suede upper and a stacked-look heel. A versatile boot that pairs with jeans, dresses, and skirts.',
    price: 139, currency: 'USD', country: '', country_code: '',
    brand: 'Cobblestone', color: 'Taupe', size: '5–11 US', material: 'Suede Upper',
    images: [PEXELS(5181697, 1200), PEXELS(15401261, 1000), PEXELS(26861949, 1000), PEXELS(36581188, 1000), PEXELS(37359481, 1000)],
    rating: 4.6, rating_count: 112, favorite_count: 68,
    features: ['Block Heel', 'Side Zip', 'Almond Toe', 'Cushioned Footbed', 'Suede Upper'],
  },
  // 91. Sandals
  {
    property_id: 'KCO-000091', listing_type: 'product', category: 'Women',
    title: 'Strappy Leather Sandals — Tan',
    description: 'Tan strappy leather sandals with an adjustable ankle strap and a molded footbed. The full-grain leather upper softens with wear, while the flexible outsole provides grip. A 1-inch heel adds just enough lift for all-day comfort. Perfect for warm-weather outings from casual to dressy.',
    price: 89, currency: 'USD', country: '', country_code: '',
    brand: 'Soleil', color: 'Tan', size: '5–11 US', material: 'Full-Grain Leather',
    images: [PEXELS(14816287, 1200), PEXELS(36034822, 1000), PEXELS(28505199, 1000), PEXELS(30782008, 1000), PEXELS(35076079, 1000)],
    rating: 4.5, rating_count: 86, favorite_count: 51,
    features: ['Adjustable Ankle Strap', 'Molded Footbed', 'Full-Grain Leather', '1" Heel', 'Flexible Outsole'],
  },
  // 92. Women's Watch
  {
    property_id: 'KCO-000092', listing_type: 'product', category: 'Women',
    title: 'Rose Gold Mesh Watch — Mother of Pearl Dial',
    description: 'A rose gold mesh-watch with a mother-of-pearl dial and a 32mm case. The stainless steel mesh band is adjustable for a perfect fit, and the Japanese quartz movement ensures reliable timekeeping. Features a scratch-resistant mineral crystal and 3 ATM water resistance. An elegant everyday timepiece.',
    price: 179, currency: 'USD', country: '', country_code: '',
    brand: 'Meridian', color: 'Rose Gold', size: '32mm Case', material: 'Stainless Steel / Mesh Band',
    images: [PEXELS(31013233, 1200), PEXELS(33306405, 1000), PEXELS(27101259, 1000), PEXELS(27289124, 1000), PEXELS(27289121, 1000)],
    rating: 4.7, rating_count: 134, favorite_count: 89,
    features: ['Rose Gold', 'Mother of Pearl Dial', 'Mesh Band', 'Japanese Quartz', '3 ATM Water Resistant'],
  },
  // 93. Necklace
  {
    property_id: 'KCO-000093', listing_type: 'product', category: 'Women',
    title: 'Layered Gold Pendant Necklace — 14K Gold Plated',
    description: 'A layered 14K gold-plated pendant necklace with a delicate chain and a coin pendant. The 18-inch chain sits perfectly at the collarbone, with a 2-inch extender for adjustable length. Hypoallergenic and tarnish-resistant. A dainty, everyday piece that layers beautifully with other necklaces.',
    price: 49, currency: 'USD', country: '', country_code: '',
    brand: 'Maison Noir', color: 'Gold', size: '18" + 2" Extender', material: '14K Gold Plated Stainless Steel',
    images: [PEXELS(27204295, 1200), PEXELS(27248250, 1000), PEXELS(26772104, 1000), PEXELS(9775326, 1000), PEXELS(12352170, 1000)],
    rating: 4.5, rating_count: 167, favorite_count: 103,
    features: ['14K Gold Plated', 'Coin Pendant', 'Adjustable Length', 'Hypoallergenic', 'Tarnish-Resistant'],
  },
  // 94. Earrings
  {
    property_id: 'KCO-000094', listing_type: 'product', category: 'Women',
    title: 'Pearl Drop Earrings — Gold Setting',
    description: 'A pair of pearl drop earrings with a gold-plated setting and freshwater pearls. The 12mm pearls have a luminous luster and hang from a delicate gold hook. Lightweight and comfortable for all-day wear. Secure lever-back closures keep them in place. An elegant gift or everyday accessory.',
    price: 39, currency: 'USD', country: '', country_code: '',
    brand: 'Maison Noir', color: 'Gold / White Pearl', size: '12mm Pearl', material: 'Gold Plated / Freshwater Pearl',
    images: [PEXELS(6738803, 1200), PEXELS(7321663, 1000), PEXELS(13516796, 1000), PEXELS(16378451, 1000), PEXELS(16266287, 1000)],
    rating: 4.6, rating_count: 98, favorite_count: 61,
    features: ['Freshwater Pearls', 'Gold Plated', 'Lever-Back Closure', '12mm Pearl', 'Lightweight'],
  },
  // 95. Ring
  {
    property_id: 'KCO-000095', listing_type: 'product', category: 'Women',
    title: 'Stacking Ring Set — Gold & Crystal',
    description: 'A set of three stacking rings in gold-plated stainless steel with crystal accents. Includes a plain band, a crystal-set band, and a twisted design. Wear them together or separately for different looks. Hypoallergenic and tarnish-resistant. Sizes 5–9 available.',
    price: 55, currency: 'USD', country: '', country_code: '',
    brand: 'Maison Noir', color: 'Gold', size: '5–9', material: 'Gold Plated Stainless Steel / Crystal',
    images: [PEXELS(8167164, 1200), PEXELS(30199263, 1000), PEXELS(29961627, 1000), PEXELS(8789597, 1000), PEXELS(14649338, 1000)],
    rating: 4.5, rating_count: 112, favorite_count: 78,
    features: ['Set of 3', 'Gold Plated', 'Crystal Accents', 'Hypoallergenic', 'Stackable'],
  },
  // 96. Sunglasses
  {
    property_id: 'KCO-000096', listing_type: 'product', category: 'Women',
    title: 'Cat-Eye Sunglasses — Tortoiseshell',
    description: 'Tortoiseshell cat-eye sunglasses with gradient brown lenses and UV400 protection. The acetate frame is lightweight and durable, with a flattering upswept silhouette. Features spring hinges for comfort and a hard case with a microfiber pouch. A timeless accessory with retro glamour.',
    price: 89, currency: 'USD', country: '', country_code: '',
    brand: 'Solis', color: 'Tortoiseshell', size: '52mm Lens', material: 'Acetate Frame / Gradient Lens',
    images: [PEXELS(7290089, 1200), PEXELS(30218919, 1000), PEXELS(6527699, 1000), PEXELS(28112142, 1000), PEXELS(34544781, 1000)],
    rating: 4.6, rating_count: 134, favorite_count: 82,
    features: ['UV400 Protection', 'Gradient Lenses', 'Acetate Frame', 'Spring Hinges', 'Hard Case Included'],
  },
  // 97. Perfume
  {
    property_id: 'KCO-000097', listing_type: 'product', category: 'Women',
    title: 'Eau de Parfum — Rose & Jasmine 90ml',
    description: 'A 90ml eau de parfum with a romantic floral scent profile. Top notes of bergamot and lychee open to a heart of rose and jasmine, with a warm base of patchouli and white musk. Long-lasting with moderate sillage. Presented in an elegant frosted glass bottle with a gold cap.',
    price: 109, currency: 'USD', country: '', country_code: '',
    brand: 'Maison Noir', color: 'Frosted Glass', size: '90ml', material: 'Eau de Parfum',
    images: [PEXELS(7256113, 1200), PEXELS(7290611, 1000), PEXELS(17679435, 1000), PEXELS(28861498, 1000), PEXELS(31450720, 1000)],
    rating: 4.7, rating_count: 189, favorite_count: 121,
    features: ['90ml', 'Rose & Jasmine', 'Long-Lasting', 'Frosted Glass Bottle', 'Gold Cap'],
  },
  // 98. Lipstick
  {
    property_id: 'KCO-000098', listing_type: 'product', category: 'Women',
    title: 'Matte Lipstick Set — 6 Nude Shades',
    description: 'A set of six matte nude lipsticks ranging from soft beige to deep mauve. The creamy formula glides on smoothly and dries to a comfortable matte finish that lasts up to 8 hours. Enriched with vitamin E and shea butter for hydration. A versatile palette for every skin tone and occasion.',
    price: 45, currency: 'USD', country: '', country_code: '',
    brand: 'Belle Studio', color: '6 Nude Shades', size: '6 x 3.5g', material: 'Matte Formula',
    images: [PEXELS(10827097, 1200), PEXELS(27063075, 1000), PEXELS(12687623, 1000), PEXELS(14072788, 1000), PEXELS(2709563, 1000)],
    rating: 4.4, rating_count: 234, favorite_count: 156,
    features: ['6 Shades', '8-Hour Wear', 'Matte Finish', 'Vitamin E', 'Shea Butter'],
  },
  // 99. Eyeshadow Palette
  {
    property_id: 'KCO-000099', listing_type: 'product', category: 'Women',
    title: '12-Color Eyeshadow Palette — Warm Neutrals',
    description: 'A 12-pan eyeshadow palette with warm neutral shades from soft mattes to shimmering bronzes. The highly pigmented, blendable formula applies smoothly and lasts all day. Includes a dual-ended brush and a full-size mirror. A versatile palette for everyday looks to dramatic evenings.',
    price: 39, currency: 'USD', country: '', country_code: '',
    brand: 'Belle Studio', color: 'Warm Neutrals', size: '12 Shades', material: 'Pressed Powder',
    images: [PEXELS(1926768, 1200), PEXELS(1864848, 1000), PEXELS(5942195, 1000), PEXELS(14924001, 1000), PEXELS(10200140, 1000)],
    rating: 4.5, rating_count: 178, favorite_count: 112,
    features: ['12 Shades', 'Highly Pigmented', 'Long-Lasting', 'Dual-Ended Brush', 'Full-Size Mirror'],
  },
  // 100. Foundation
  {
    property_id: 'KCO-000100', listing_type: 'product', category: 'Women',
    title: 'Buildable Liquid Foundation — 30ml',
    description: 'A 30ml buildable liquid foundation with a natural satin finish. The lightweight formula provides medium to full coverage without caking or settling into fine lines. Infused with hyaluronic acid for hydration and SPF 30 for sun protection. Available in 30 shades. Suitable for all skin types.',
    price: 35, currency: 'USD', country: '', country_code: '',
    brand: 'Belle Studio', color: '30 Shades Available', size: '30ml', material: 'Liquid Formula',
    images: [PEXELS(35766179, 1200), PEXELS(20439186, 1000), PEXELS(17557255, 1000), PEXELS(19590846, 1000), PEXELS(30147917, 1000)],
    rating: 4.3, rating_count: 156, favorite_count: 89,
    features: ['SPF 30', 'Buildable Coverage', 'Hyaluronic Acid', 'Satin Finish', '30 Shades'],
  },
  // 101. Face Serum
  {
    property_id: 'KCO-000101', listing_type: 'product', category: 'Women',
    title: 'Vitamin C Brightening Serum — 30ml',
    description: 'A 30ml vitamin C brightening serum with 15% L-ascorbic acid and ferulic acid. This potent antioxidant serum visibly brightens, evens skin tone, and reduces the appearance of dark spots. Lightweight and fast-absorbing. Suitable for all skin types. Use morning and evening before moisturizer.',
    price: 42, currency: 'USD', country: '', country_code: '',
    brand: 'Glow Lab', color: 'Clear', size: '30ml', material: 'Liquid Serum',
    images: [PEXELS(16774128, 1200), PEXELS(16564555, 1000), PEXELS(17244603, 1000), PEXELS(23947043, 1000), PEXELS(17244558, 1000)],
    rating: 4.6, rating_count: 312, favorite_count: 198,
    features: ['15% Vitamin C', 'Ferulic Acid', 'Brightening', 'Fast-Absorbing', 'All Skin Types'],
  },
  // 102. Moisturizer
  {
    property_id: 'KCO-000102', listing_type: 'product', category: 'Women',
    title: 'Hydrating Face Cream — 50ml',
    description: 'A 50ml hydrating face cream with ceramides, squalane, and glycerin for long-lasting moisture. The rich yet non-greasy formula strengthens the skin barrier and leaves a dewy finish. Fragrance-free and dermatologist-tested. Suitable for dry and combination skin. Use morning and evening.',
    price: 38, currency: 'USD', country: '', country_code: '',
    brand: 'Glow Lab', color: 'White', size: '50ml', material: 'Cream',
    images: [PEXELS(6716445, 1200), PEXELS(30720992, 1000), PEXELS(6155638, 1000), PEXELS(13152076, 1000), PEXELS(4690501, 1000)],
    rating: 4.5, rating_count: 198, favorite_count: 124,
    features: ['Ceramides', 'Squalane', 'Fragrance-Free', 'Dermatologist-Tested', 'Dewy Finish'],
  },
  // 103. Shampoo
  {
    property_id: 'KCO-000103', listing_type: 'product', category: 'Women',
    title: 'Argan Oil Repair Shampoo — 300ml',
    description: 'A 300ml argan oil repair shampoo for dry and damaged hair. Enriched with cold-pressed argan oil, keratin, and aloe vera to nourish and strengthen from root to tip. Sulfate-free and color-safe. Restores shine and softness with every wash. Suitable for all hair types.',
    price: 24, currency: 'USD', country: '', country_code: '',
    brand: 'Glow Lab', color: 'Amber', size: '300ml', material: 'Liquid',
    images: [PEXELS(2388245, 1200), PEXELS(13214674, 1000), PEXELS(28497015, 1000), PEXELS(32174992, 1000), PEXELS(9574991, 1000)],
    rating: 4.4, rating_count: 167, favorite_count: 98,
    features: ['Argan Oil', 'Keratin', 'Sulfate-Free', 'Color-Safe', 'Aloe Vera'],
  },
  // 104. Nail Polish Set
  {
    property_id: 'KCO-000104', listing_type: 'product', category: 'Women',
    title: 'Gel Nail Polish Set — 6 Spring Shades',
    description: 'A set of six gel nail polish bottles in spring-inspired shades from soft pink to lavender. The long-lasting gel formula provides up to 21 days of chip-free wear with a high-gloss finish. Requires UV/LED lamp for curing. Includes a base coat and top coat for a complete salon-quality manicure at home.',
    price: 35, currency: 'USD', country: '', country_code: '',
    brand: 'Belle Studio', color: '6 Spring Shades', size: '6 x 10ml', material: 'Gel Formula',
    images: [PEXELS(13219628, 1200), PEXELS(15794598, 1000), PEXELS(3924342, 1000), PEXELS(31094915, 1000), PEXELS(11411815, 1000)],
    rating: 4.3, rating_count: 89, favorite_count: 56,
    features: ['6 Shades', '21-Day Wear', 'High-Gloss Finish', 'UV/LED Cure', 'Base & Top Coat'],
  },
  // 105. Makeup Brushes
  {
    property_id: 'KCO-000105', listing_type: 'product', category: 'Women',
    title: '12-Piece Makeup Brush Set — Rose Gold',
    description: 'A 12-piece rose gold makeup brush set with soft synthetic bristles and ergonomic handles. Includes brushes for foundation, powder, blush, eyeshadow, eyeliner, and blending. Comes with a vegan leather travel case. The dense, cruelty-free bristles apply product smoothly and wash easily.',
    price: 32, currency: 'USD', country: '', country_code: '',
    brand: 'Belle Studio', color: 'Rose Gold', size: '12 Brushes', material: 'Synthetic Bristles / Aluminum',
    images: [PEXELS(3924346, 1200), PEXELS(11411806, 1000), PEXELS(324657, 1000), PEXELS(4620872, 1000), PEXELS(7290181, 1000)],
    rating: 4.5, rating_count: 234, favorite_count: 147,
    features: ['12 Brushes', 'Synthetic Bristles', 'Rose Gold Handles', 'Travel Case', 'Cruelty-Free'],
  },
];

export function formatPrice(listing) {
  const formatted = listing.price.toLocaleString('en-US', { style: 'currency', currency: listing.currency || 'USD', maximumFractionDigits: 0 });
  return listing.price_period ? `${formatted}/mo` : formatted;
}

export function flagEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return '';
  const codePoints = countryCode.toUpperCase().split('').map(c => 0x1F1E6 + c.charCodeAt(0) - 65);
  return String.fromCodePoint(...codePoints);
}

// Lookup helper: find a listing by its property_id
const LISTING_MAP = new Map(SHOWROOM_LISTINGS.map(l => [l.property_id, l]));

export function getListingsByIds(ids) {
  return ids.map(id => LISTING_MAP.get(id)).filter(Boolean);
}

// ── Database product loading ──────────────────────────────────
// Products created by the AI Admin Assistant are saved to the
// showroom_listings table.  We fetch those rows at runtime and merge
// them with the hardcoded seed data so they appear on the marketplace
// automatically — no rebuild required.

let _dbListings = [];
let _dbLoaded = false;

export function getDBListings() { return _dbListings; }
export function isDBLoaded() { return _dbLoaded; }

export async function loadDBListings() {
  try {
    const { supabase } = await import('./supabase-client.js');
    const { data, error } = await supabase
      .from('showroom_listings')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (error) { _dbLoaded = true; return []; }
    _dbListings = (data || []).map(row => ({
      ...row,
      images: Array.isArray(row.images) ? row.images : [],
      features: Array.isArray(row.features) ? row.features : [],
      rating: Number(row.rating) || 0,
      rating_count: row.rating_count || 0,
      favorite_count: row.favorite_count || 0,
      price: Number(row.price) || 0,
    }));
    // Merge into the listing map (DB entries take priority on duplicate IDs)
    for (const l of _dbListings) LISTING_MAP.set(l.property_id, l);
    _dbLoaded = true;
    return _dbListings;
  } catch {
    _dbLoaded = true;
    return [];
  }
}

// Return ALL listings: hardcoded + database, deduplicated by property_id.
export function getAllListings() {
  const seen = new Set();
  const all = [];
  for (const l of _dbListings) {
    if (!seen.has(l.property_id)) { seen.add(l.property_id); all.push(l); }
  }
  for (const l of SHOWROOM_LISTINGS) {
    if (!seen.has(l.property_id)) { seen.add(l.property_id); all.push(l); }
  }
  return all;
}

// Find a single listing by property_id across both sources.
export function findListingById(id) {
  return LISTING_MAP.get(id) || null;
}
