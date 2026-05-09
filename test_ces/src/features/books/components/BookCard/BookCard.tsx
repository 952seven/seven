import React from 'react';
import { Edit2, Trash2, Tag } from 'lucide-react';
import { Book } from '../../types/Book';
import { Button } from '../../../../shared/components/Button/Button';
import styles from './BookCard.module.scss';

interface BookCardProps {
  book: Book;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  selected,
  onToggleSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={`${styles.card} ${selected ? styles.selected : ''}`}>
      <div className={styles.header}>
        <label className={styles.select}>
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect(book.id)}
          />
          <span className={styles.selectLabel}>选择</span>
        </label>

        <span className={styles.category}>
          <Tag size={12} />
          {book.category}
        </span>
        <span className={styles.price}>¥{book.price.toFixed(2)}</span>
      </div>
      
      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.description}>{book.description}</p>
      
      <div className={styles.actions}>
        <Button variant="secondary" size="sm" onClick={() => onEdit(book)}>
          <Edit2 size={14} />
          编辑
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(book.id)}>
          <Trash2 size={14} />
          删除
        </Button>
      </div>
    </div>
  );
};
