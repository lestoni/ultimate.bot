// Utility for logger interface
import winston from 'winston';

import config from '../utils/config';
import { pkg } from '../utils/meta';

const { combine, timestamp, label, printf, colorize } = winston.format;

type Entry = Record<string, unknown> | Error;

const appFormat = printf(({ level, message, label, timestamp }): string => {
  return `[${label}] ${timestamp} - ${level}: ${message}`;
});

export interface Logger {
  debug(msg: string, entries?: Entry): void;
  info(msg: string, entries?: Entry): void;
  warning(msg: string, entries?: Entry): void;
  error(msg: string, entries?: Entry): void;
}

const logger: winston.Logger = winston.createLogger({
  level: config.get('LOG_LEVEL'),
  format: combine(
    label({ label: pkg.name }),
    timestamp(),
    colorize(),
    appFormat
  ),
  transports: [new winston.transports.Console()]
});

export default function (scope: string): Logger {
  return {
    debug(msg: string, entries: Entry = {}): void {
      logger.debug(msg, { ...entries, scope });
    },
    info(msg: string, entries: Entry = {}): void {
      logger.info(msg, { ...entries, scope });
    },
    warning(msg: string, entries: Entry = {}): void {
      logger.warn(msg, { ...entries, scope });
    },
    error(msg: string, entries: Entry = {}): void {
      logger.error(msg, { ...entries, scope });
    }
  };
}
