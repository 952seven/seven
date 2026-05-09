import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookSortOption } from '../../features/books/types/Book';

interface BooksState {
  items: Book[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  sortBy: BookSortOption;
}

const initialState: BooksState = {
  items: [
    {
      id: '1',
      title: '代码整洁',
      price: 45.99,
      category: '技术',
      description: '代码整洁',
      createdAt: new Date('2024-01-01').toISOString(),
    },
    {
      id: '2',
      title: '程序员',
      price: 49.99,
      category: '技术',
      description: '程序员',
      createdAt: new Date('2024-01-02').toISOString(),
    },
    {
      id: '3',
      title: '设计模式',
      price: 54.50,
      category: '软件工程',
      description: '系统结构。',
      createdAt: new Date('2024-01-03').toISOString(),
    }
  ],
  loading: false,
  error: null,
  searchQuery: '',
  sortBy: BookSortOption.NEWEST,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.items = action.payload;
    },
    addBook(state, action: PayloadAction<Book>) {
      state.items.unshift(action.payload);
    },
    updateBook(state, action: PayloadAction<Book>) {
      const index = state.items.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteBook(state, action: PayloadAction<string>) {
      state.items = state.items.filter((b) => b.id !== action.payload);
    },
    deleteMultipleBooks(state, action: PayloadAction<string[]>) {
      state.items = state.items.filter((b) => !action.payload.includes(b.id));
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSortBy(state, action: PayloadAction<BookSortOption>) {
      state.sortBy = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setBooks,
  addBook,
  updateBook,
  deleteBook,
  deleteMultipleBooks,
  setSearchQuery,
  setSortBy,
  setLoading,
} = booksSlice.actions;

export default booksSlice.reducer;
