import moment from 'moment'
import { LogTypes } from './LogTypes'

export class Logger {
  private static getCurrentTimestamp(): string {
    return `[${moment().utc().format('YYYY-MM-DD HH:mm:ss')}] `
  }

  private static getLogTypePrefix(logType: LogTypes): string {
    return `[${LogTypes[logType]}] `
  }

  public static log(logType: LogTypes, arg: any, ...args: any[]) {
    console.log(
      this.getCurrentTimestamp() + this.getLogTypePrefix(logType) + arg,
      ...args
    )
  }
}
