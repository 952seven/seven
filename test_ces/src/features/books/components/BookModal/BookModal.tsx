import React, { useState, useEffect } from 'react';
import { Modal } from '../../../../shared/components/Modal/Modal';
import { Input } from '../../../../shared/components/Input/Input';
import { Button } from '../../../../shared/components/Button/Button';
import { Book, BookFormData } from '../../types/Book';
import styles from './BookModal.module.scss';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookFormData) => void;
  initialData?: Book | null;
}

const initialFormState: BookFormData = {
  title: '',
  price: 0,
  category: '',
  description: '',
};

export const BookModal: React.FC<BookModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<BookFormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof BookFormData, string>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        price: initialData.price,
        category: initialData.category,
        description: initialData.description,
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookFormData, string>> = {};
    if (!formData.title) newErrors.title = '请输入书名';
    if (formData.price <= 0) newErrors.price = '价格必须大于 0';
    if (!formData.category) newErrors.category = '请输入分类';
    if (!formData.description) newErrors.description = '请输入描述';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? '编辑图书' : '新增图书'}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="书名"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
          placeholder="例如：代码整洁"
        />
        <div className={styles.row}>
          <Input
            label="价格"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            error={errors.price}
          />
          <Input
            label="分类"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            error={errors.category}
            placeholder="例如：技术"
          />
        </div>
        <Input
          label="描述"
          multiline
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          error={errors.description}
          placeholder="请输入图书简介…"
        />
        <div className={styles.footer}>
          <Button variant="secondary" type="button" onClick={onClose}>
            取消
          </Button>
          <Button variant="primary" type="submit">
            {initialData ? '保存修改' : '确认新增'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
