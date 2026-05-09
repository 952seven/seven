import { LogEntry } from './LogEntry';

export interface IFormatter {
  format(entry: LogEntry): string;
}
