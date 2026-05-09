import { LogEntry } from './LogEntry';
import { LogLevel } from '../enums/LogLevel';

export interface ITransport {
  level: LogLevel;
  log(entry: LogEntry): void;
}
