export interface Book {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  createdAt: string;
}

export type BookFormData = Omit<Book, 'id' | 'createdAt'>;

export enum BookSortOption {
  NEWEST = 'newest',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  TITLE_ASC = 'title_asc',
}
