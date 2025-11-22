export type Accommodation = {
  id: string;
  name: string;
  type: 'Cottage' | 'Glamping Tent' | 'Family Villa';
  price: number;
  capacity: number;
  description: string;
  image: string;
};

export type Tour = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  image: string;
};

export type WatersportActivity = {
  id: string;
  name: string;
  capacity: number;
  duration: string;
  basePrice: number;
  excessCharge: number;
  category: string;
  intensity: 'Low' | 'Moderate' | 'High' | 'Extreme';
  minAge: number;
  image: string;
  description?: string;
};

export type CottageType = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export const accommodations: Accommodation[] = [
  {
    id: 'acc001',
    name: 'Serene Beachfront Cottage',
    type: 'Cottage',
    price: 2500,
    capacity: 4,
    description:
      'Wake up to the sound of waves in our cozy beachfront cottage, perfect for small families or couples.',
    image: 'cottage-1',
  },
  {
    id: 'acc002',
    name: 'Deluxe Beachfront Cottage',
    type: 'Cottage',
    price: 3500,
    capacity: 5,
    description:
      'Experience comfort with a stunning ocean view. Our deluxe cottage offers more space and premium amenities.',
    image: 'cottage-2',
  },
  {
    id: 'acc003',
    name: 'Starlight Glamping Tent',
    type: 'Glamping Tent',
    price: 1200,
    capacity: 2,
    description:
      'Sleep under the stars in comfort. Our glamping tents offer a unique blend of nature and luxury.',
    image: 'glamping-1',
  },
  {
    id: 'acc004',
    name: 'Family Glamping Tent',
    type: 'Glamping Tent',
    price: 2000,
    capacity: 4,
    description:
      'A spacious tent for the whole family, combining adventure with the comforts of home.',
    image: 'glamping-2',
  },
  {
    id: 'acc005',
    name: 'Balatasan Family Villa',
    type: 'Family Villa',
    price: 5000,
    capacity: 8,
    description:
      'Our standard villa is perfect for larger groups, offering multiple rooms and ample living space.',
    image: 'villa-1',
  },
  {
    id: 'acc006',
    name: 'Presidential Family Villa',
    type: 'Family Villa',
    price: 7000,
    capacity: 12,
    description:
      'The ultimate luxury experience with a private pool, expansive ocean views, and exclusive amenities.',
    image: 'villa-2',
  },
];

export const tours: Tour[] = [
  {
    id: 'tour001',
    name: 'Aslom & Sibalat Island',
    price: 1200,
    duration: '5 hours',
    description:
      'Visit the beautiful sandbar of Aslom Island and the pristine Sibalat Island. Enjoy a freshly prepared lunch in a secluded beach.',
    image: 'aslom-sibalat-1',
  },
  {
    id: 'tour002',
    name: 'Target Island',
    price: 1000,
    duration: '4 hours',
    description:
      'A quick getaway to a beautiful nearby island, perfect for a half-day trip.',
    image: 'target-island-1',
  },
  {
    id: 'tour003',
    name: 'Buyayao Island',
    price: 1500,
    duration: '6 hours',
    description:
      'Explore a protected marine area with vibrant coral reefs and diverse sea life.',
    image: 'buyayao-1',
  },
  {
    id: 'tour004',
    name: 'Suguicay Island',
    price: 900,
    duration: '4 hours',
    description:
      'Relax on the white sand beaches of Suguicay Island and enjoy the tranquil atmosphere.',
    image: 'suguicay-1',
  },
  {
    id: 'tour005',
    name: 'Silad Island',
    price: 950,
    duration: '4 hours',
    description:
      'Discover the unique rock formations and hidden coves of Silad Island.',
    image: 'silad-1',
  },
];

export const watersports: WatersportActivity[] = [
  {
    id: 'ws001',
    name: 'Flying Fish',
    capacity: 3,
    duration: '15 minutes',
    basePrice: 1500,
    excessCharge: 500,
    category: 'Inflatable Rides',
    intensity: 'High',
    minAge: 10,
    image: 'flying-fish-1',
    description: 'Experience the thrill of flying over the waves!',
  },
  {
    id: 'ws002',
    name: 'Banana Boat',
    capacity: 12,
    duration: '15 minutes',
    basePrice: 3000,
    excessCharge: 250,
    category: 'Inflatable Rides',
    intensity: 'Moderate',
    minAge: 8,
    image: 'banana-boat-1',
    description: 'Fun group ride perfect for families!',
  },
  {
    id: 'ws003',
    name: 'Hurricane',
    capacity: 6,
    duration: '15 minutes',
    basePrice: 2000,
    excessCharge: 350,
    category: 'Inflatable Rides',
    intensity: 'High',
    minAge: 12,
    image: 'hurricane-1',
    description: 'Spin and splash in this exciting ride!',
  },
  {
    id: 'ws004',
    name: 'Crazy UFO',
    capacity: 6,
    duration: '15 minutes',
    basePrice: 2000,
    excessCharge: 350,
    category: 'Inflatable Rides',
    intensity: 'Extreme',
    minAge: 12,
    image: 'crazy-ufo-1',
    description: 'Out-of-this-world water adventure!',
  },
  {
    id: 'ws007',
    name: 'Jet Ski',
    capacity: 2,
    duration: 'Flexible (per minute)',
    basePrice: 150,
    excessCharge: 0,
    category: 'Motorized',
    intensity: 'High',
    minAge: 18,
    image: 'jet-ski-1',
    description: 'High-speed adventure across the waves!',
  },
  {
    id: 'ws005',
    name: 'Pedal Boat',
    capacity: 4,
    duration: '1 hour',
    basePrice: 500,
    excessCharge: 0,
    category: 'Self-Powered',
    intensity: 'Low',
    minAge: 6,
    image: 'pedal-boat-1',
    description: 'Leisurely cruise around the bay.',
  },
  {
    id: 'ws006',
    name: 'Hand Paddle Boat',
    capacity: 2,
    duration: '1 hour',
    basePrice: 200,
    excessCharge: 0,
    category: 'Self-Powered',
    intensity: 'Low',
    minAge: 6,
    image: 'hand-paddle-boat-1',
    description: 'Traditional paddle boat experience.',
  },
];

export const cottageTypes: CottageType[] = [
  { id: 'cottage-std', name: 'Standard', price: 1500, image: 'cottage-std-img', description: 'Ideal for a standard getaway. Simple and elegant.' },
  { id: 'cottage-teen', name: 'Teenager/Children', price: 2000, image: 'cottage-teen-img', description: 'Ideal for teenagers and children. Fun and spacious with colorful blue design. Features vibrant colors and playful atmosphere!' },
  { id: 'cottage-fam', name: 'Family', price: 2500, image: 'cottage-fam-img', description: 'Perfect for families. Spacious and comfortable with great views.' },
];
