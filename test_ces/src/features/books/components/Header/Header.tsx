import React from 'react';
import { Search, Plus, BookOpen, Filter, Trash2 } from 'lucide-react';
import { Button } from '../../../../shared/components/Button/Button';
import { BookSortOption } from '../../types/Book';
import styles from './Header.module.scss';

interface HeaderProps {
  onAddClick: () => void;
  onBulkDelete: () => void;
  selectedCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: BookSortOption;
  onSortChange: (option: BookSortOption) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onAddClick,
  onBulkDelete,
  selectedCount,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <BookOpen size={28} className={styles.logoIcon} />
          <h1>图书管理</h1>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="按书名或分类搜索…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterWrapper}>
            <Filter size={18} className={styles.filterIcon} />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as BookSortOption)}
              className={styles.sortSelect}
            >
              <option value={BookSortOption.NEWEST}>最新优先</option>
              <option value={BookSortOption.PRICE_ASC}>价格：从低到高</option>
              <option value={BookSortOption.PRICE_DESC}>价格：从高到低</option>
              <option value={BookSortOption.TITLE_ASC}>书名：A-Z</option>
            </select>
          </div>

          <Button
            variant="danger"
            onClick={onBulkDelete}
            className={styles.bulkDeleteBtn}
            disabled={selectedCount === 0}
          >
            <Trash2 size={18} />
            <span>批量删除{selectedCount > 0 ? `（${selectedCount}）` : ''}</span>
          </Button>

          <Button onClick={onAddClick} className={styles.addBtn}>
            <Plus size={18} />
            <span>添加书籍</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
