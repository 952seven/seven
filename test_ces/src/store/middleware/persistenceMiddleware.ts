import { Middleware } from '@reduxjs/toolkit';

const LOCAL_STORAGE_KEY = 'books_system_state';

export const persistenceMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.books.items));
  return result;
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
