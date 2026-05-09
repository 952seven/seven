import { Middleware } from '@reduxjs/toolkit';
import { logger } from '../../core/logger/Logger';

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const actionType = typeof (action as { type?: unknown }).type === 'string' ? (action as { type: string }).type : '未知动作';
  const payload = (action as { payload?: unknown }).payload;

  logger.info(`Redux 动作：${actionType}`, {
    载荷: payload,
    下一状态: store.getState(),
  });
  return result;
};
