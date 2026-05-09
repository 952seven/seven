import { configureStore } from '@reduxjs/toolkit';
import booksReducer, { setBooks } from './slices/booksSlice';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import { persistenceMiddleware, loadState } from './middleware/persistenceMiddleware';
import { ConsoleTransport } from '../core/logger/transports/ConsoleTransport';
import { NativeFileTransport } from '../core/logger/transports/NativeFileTransport';
import { LogLevel } from '../core/logger/enums/LogLevel';
import { DefaultFormatter } from '../core/logger/formatters/DefaultFormatter';
import { logger } from '../core/logger/Logger';

// 初始化日志系统（可按环境变量调整等级与传输方式）
const formatter = new DefaultFormatter();
logger.addTransport(new ConsoleTransport(LogLevel.INFO, formatter));
logger.addTransport(new NativeFileTransport(LogLevel.VERBOSE, formatter, 'logs/应用.log'));

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware, persistenceMiddleware),
});

// 加载持久化数据（仅恢复图书列表）
const savedBooks = loadState();
if (savedBooks) {
  store.dispatch(setBooks(savedBooks));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
