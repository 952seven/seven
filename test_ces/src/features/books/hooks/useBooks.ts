import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addBook,
  updateBook,
  deleteBook,
  deleteMultipleBooks,
  setSearchQuery,
  setSortBy,
} from '../../../store/slices/booksSlice';
import { Book, BookFormData, BookSortOption } from '../types/Book';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../../../core/logger/Logger';

export const useBooks = () => {
  const dispatch = useAppDispatch();
  const { items, searchQuery, sortBy, loading } = useAppSelector((state) => state.books);

  const filteredBooks = items
    .filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case BookSortOption.PRICE_ASC:
          return a.price - b.price;
        case BookSortOption.PRICE_DESC:
          return b.price - a.price;
        case BookSortOption.TITLE_ASC:
          return a.title.localeCompare(b.title);
        case BookSortOption.NEWEST:
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const handleAddBook = (data: BookFormData) => {
    const newBook: Book = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    dispatch(addBook(newBook));
    logger.info(`新增图书：${newBook.title}`, { 图书ID: newBook.id });
  };

  const handleUpdateBook = (id: string, data: BookFormData) => {
    const updatedBook: Book = {
      ...data,
      id,
      createdAt: items.find((b) => b.id === id)?.createdAt || new Date().toISOString(),
    };
    dispatch(updateBook(updatedBook));
    logger.info(`更新图书：${updatedBook.title}`, { 图书ID: id });
  };

  const handleDeleteBook = (id: string) => {
    dispatch(deleteBook(id));
    logger.warning(`删除图书：${id}`, { 图书ID: id });
  };

  const handleDeleteMultipleBooks = (ids: string[]) => {
    dispatch(deleteMultipleBooks(ids));
    logger.warning(`批量删除图书：${ids.length} 本`, { 图书ID列表: ids });
  };

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleSort = (option: BookSortOption) => {
    dispatch(setSortBy(option));
  };

  return {
    books: filteredBooks,
    loading,
    searchQuery,
    sortBy,
    handleAddBook,
    handleUpdateBook,
    handleDeleteBook,
    handleDeleteMultipleBooks,
    handleSearch,
    handleSort,
  };
};
