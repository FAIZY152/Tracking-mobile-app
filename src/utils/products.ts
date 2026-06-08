export type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  rating: number;
  stock: string;
  image: string;
};

export const products: Product[] = [
  {
    id: '1',
    title: 'Nike Air Max Pro',
    category: "Men's Running Shoes",
    description: 'Lightweight comfort with a clean luxury streetwear look.',
    price: '$199',
    rating: 4.9,
    stock: 'In Stock',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
  },
  {
    id: '2',
    title: 'Adidas Ultraboost',
    category: "Men's Running Shoes",
    description: 'Boosted comfort for every run.',
    price: '$220',
    rating: 4.8,
    stock: 'In Stock',
    image:
      'https://images.unsplash.com/photo-1595950653203-7e23c0b70b0c?w=800',
  },
  {
    id: '3',
    title: 'Puma Ignite',
    category: "Men's Training Shoes",
    description: 'Ignite energy in your workouts.',
    price: '$180',
    rating: 4.7,
    stock: 'Limited',
    image:
      'https://images.unsplash.com/photo-1618354690434-f9588b9edb6b?w=800',
  },
  {
    id: '4',
    title: 'Reebok Nano X',
    category: "Men's Crossfit Shoes",
    description: 'Stability meets comfort for functional fitness.',
    price: '$210',
    rating: 4.6,
    stock: 'In Stock',
    image:
      'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=800',
  },
  {
    id: '5',
    title: 'Asics Gel-Kayano',
    category: "Men's Running Shoes",
    description: 'Supportive and cushioned for long runs.',
    price: '$230',
    rating: 4.9,
    stock: 'In Stock',
    image:
      'https://images.unsplash.com/photo-1600180758895-4c47ef1b1f0d?w=800',
  },
];
