import { ProductPreviewType } from './Types';

export const products: ProductPreviewType[] = [
  {
    id: 'p1',
    name: 'Wooden Teapot Via Jar',
    category: 'jugs',
    image: '/p1.jpg',
    href: '/category/p1',
    price: 45,
    oldPrice: 65,
    thumbnail: '/p1-thumb.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    name: 'Buckle Wrap Wooden Table',
    category: 'tables',
    image: '/p2.jpg',
    href: '/category/p2',
    price: 52,
    thumbnail: '/p2-thumb.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p3',
    name: 'Wooden Bluetooth Speaker',
    category: 'speakers',
    image: '/p3.jpg',
    href: '/category/p3',
    price: 36,
    thumbnail: '/p3-thumb.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p4',
    name: 'Wooden Coffee Mug',
    category: 'mugs',
    image: '/p4.jpg',
    href: '/category/p4',
    price: 23,
    thumbnail: '/p4-thumb.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p5',
    name: 'Wooden White Chair',
    category: 'chairs',
    image: '/p5.jpg',
    href: '/category/p5',
    price: 45,
    oldPrice: 65,
    thumbnail: '/p5-thumb.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p6',
    name: 'Black Wooden Wardrobe',
    category: 'tables',
    image: '/p6.jpg',
    href: '/category/p6',
    price: 52,
    thumbnail: '/p6-thumb.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p7',
    name: 'Black Chair Wooden Craft',
    category: 'chairs',
    image: '/p7.jpg',
    href: '/category/p7',
    price: 36,
    thumbnail: '/p7-thumb.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p8',
    name: 'Wall Decorator for Plant',
    category: 'plants',
    image: '/p8.jpg',
    href: '/category/p8',
    price: 23,
    thumbnail: '/p8-thumb.jpg',
    createdAt: new Date().toISOString(),
  },
];
