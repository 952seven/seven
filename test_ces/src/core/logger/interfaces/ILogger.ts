export interface ILogger {
  verbose(message: string, context?: string, metadata?: Record<string, unknown>): void;
  info(message: string, context?: string, metadata?: Record<string, unknown>): void;
  warning(message: string, context?: string, metadata?: Record<string, unknown>): void;
  error(message: string, context?: string, metadata?: Record<string, unknown>): void;
}
