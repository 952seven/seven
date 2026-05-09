import { ITransport } from '../interfaces/ITransport';
import { LogEntry } from '../interfaces/LogEntry';
import { LogLevel } from '../enums/LogLevel';
import { IFormatter } from '../interfaces/IFormatter';

export class ConsoleTransport implements ITransport {
  constructor(
    public level: LogLevel,
    private formatter: IFormatter
  ) {}

  log(entry: LogEntry): void {
    if (entry.level < this.level) return;

    const message = this.formatter.format(entry);
    switch (entry.level) {
      case LogLevel.VERBOSE:
        console.debug(message);
        break;
      case LogLevel.INFO:
        console.info(message);
        break;
      case LogLevel.WARNING:
        console.warn(message);
        break;
      case LogLevel.ERROR:
        console.error(message);
        break;
    }
  }
}
