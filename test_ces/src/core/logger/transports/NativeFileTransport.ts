import { ITransport } from '../interfaces/ITransport';
import { LogEntry } from '../interfaces/LogEntry';
import { LogLevel } from '../enums/LogLevel';
import { IFormatter } from '../interfaces/IFormatter';

export function NativeFileWriteSync(filePath: string, buffer: string): void {
  console.log(`[File IO ${filePath}] ${buffer}`);
}

export class NativeFileTransport implements ITransport {
  constructor(
    public level: LogLevel,
    private formatter: IFormatter,
    private filePath: string
  ) {}

  log(entry: LogEntry): void {
    if (entry.level < this.level) return;
    const message = this.formatter.format(entry);
    NativeFileWriteSync(this.filePath, message);
  }
}

