import React, { useState, useEffect } from 'react';
import { Header } from './features/books/components/Header/Header';
import { BookList } from './features/books/components/BookList/BookList';
import { BookModal } from './features/books/components/BookModal/BookModal';
import { useBooks } from './features/books/hooks/useBooks';
import { Book, BookFormData } from './features/books/types/Book';
import { setLoading } from './store/slices/booksSlice';
import { useAppDispatch } from './store/hooks';
import './App.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    books,
    loading,
    searchQuery,
    sortBy,
    handleAddBook,
    handleUpdateBook,
    handleDeleteBook,
    handleDeleteMultipleBooks,
    handleSearch,
    handleSort,
  } = useBooks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // 模拟初始化加载态（真实项目可替换为 API 请求）
  useEffect(() => {
    dispatch(setLoading(true));
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    setSelectedIds((prev) => {
      const existingIds = new Set(books.map((b) => b.id));
      const next = new Set<string>();
      let hasChange = false;
      prev.forEach((id) => {
        if (existingIds.has(id)) {
          next.add(id);
        } else {
          hasChange = true;
        }
      });
      if (!hasChange && next.size === prev.size) return prev;
      return next;
    });
  }, [books]);

  const openAddModal = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const openEditModal = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data: BookFormData) => {
    if (editingBook) {
      handleUpdateBook(editingBook.id, data);
    } else {
      handleAddBook(data);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const onDeleteSingle = (id: string) => {
    if (!window.confirm('确认删除这本图书吗？')) return;
    handleDeleteBook(id);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const onBulkDelete = () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    if (!window.confirm(`确认批量删除 ${ids.length} 本图书吗？此操作不可撤销。`)) return;
    handleDeleteMultipleBooks(ids);
    setSelectedIds(new Set());
  };

  return (
    <div className="app-container">
      <Header
        onAddClick={openAddModal}
        onBulkDelete={onBulkDelete}
        selectedCount={selectedIds.size}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        sortBy={sortBy}
        onSortChange={handleSort}
      />

      <main className="main-content">
        <div className="container">
          <div className="stats-bar">
            <span>当前图书数：<strong>{books.length}</strong></span>
          </div>
          
          <BookList
            books={books}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onEdit={openEditModal}
            onDelete={onDeleteSingle}
            loading={loading}
          />
        </div>
      </main>

      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingBook}
      />
    </div>
  );
};

export default App;
