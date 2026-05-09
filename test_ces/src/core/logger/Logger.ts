import { ILogger } from './interfaces/ILogger';
import { ITransport } from './interfaces/ITransport';
import { LogLevel } from './enums/LogLevel';
import { LogEntry } from './interfaces/LogEntry';

export class Logger implements ILogger {
  private transports: ITransport[] = [];

  constructor(private context?: string) {}

  public addTransport(transport: ITransport): void {
    this.transports.push(transport);
  }

  private log(level: LogLevel, message: string, metadata?: Record<string, unknown>): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context: this.context,
      metadata,
    };

    this.transports.forEach((transport) => transport.log(entry));
  }

  verbose(message: string, metadata?: Record<string, unknown>): void {
    this.log(LogLevel.VERBOSE, message, metadata);
  }

  info(message: string, metadata?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, metadata);
  }

  warning(message: string, metadata?: Record<string, unknown>): void {
    this.log(LogLevel.WARNING, message, metadata);
  }

  error(message: string, metadata?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, message, metadata);
  }

  // 生成带上下文的子日志器（常用于模块级日志追踪）
  child(context: string): Logger {
    const childLogger = new Logger(context);
    this.transports.forEach(t => childLogger.addTransport(t));
    return childLogger;
  }
}

// 全局默认日志器实例
export const logger = new Logger('应用');
