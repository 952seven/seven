import { IFormatter } from '../interfaces/IFormatter';
import { LogEntry } from '../interfaces/LogEntry';
import { LogLevel } from '../enums/LogLevel';

export class DefaultFormatter implements IFormatter {
  private levelToLabel(level: LogLevel): string {
    switch (level) {
      case LogLevel.VERBOSE:
        return '详细';
      case LogLevel.INFO:
        return '信息';
      case LogLevel.WARNING:
        return '警告';
      case LogLevel.ERROR:
        return '错误';
    }
  }

  format(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const level = this.levelToLabel(entry.level).padEnd(2);
    const context = entry.context ? `【${entry.context}】` : '';
    const metadata = entry.metadata ? ` | ${JSON.stringify(entry.metadata)}` : '';

    return `${timestamp} | ${level} | ${context}${entry.message}${metadata}`;
  }
}
