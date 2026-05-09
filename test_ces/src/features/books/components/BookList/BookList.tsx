import React from 'react';
import { BookCard } from '../BookCard/BookCard';
import { Book } from '../../types/Book';
import { Library } from 'lucide-react';
import styles from './BookList.module.scss';

interface BookListProps {
  books: Book[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  selectedIds,
  onToggleSelect,
  onEdit,
  onDelete,
  loading,
}) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.skeletonGrid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeletonCard} />
          ))}
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Library size={64} className={styles.emptyIcon} />
        <h3>没有找到图书</h3>
        <p>试试调整搜索条件，或点击上方按钮新增一本图书。</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          selected={selectedIds.has(book.id)}
          onToggleSelect={onToggleSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
