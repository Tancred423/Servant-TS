import moment from 'moment'
import { LogTypes } from './LogTypes'

export class Logger {
  private static getCurrentTimestamp(): string {
    return `[${moment().utc().format('YYYY-MM-DD HH:mm:ss')}] `
  }

  private static getLogTypePrefix(logType: LogTypes): string {
    return `[${LogTypes[logType]}] `
  }

  private static getId(id: number): string {
    return `[${id}] `
  }

  public static log(logType: LogTypes, id: number, arg: any, ...args: any[]) {
    console.log(
      this.getCurrentTimestamp() +
        this.getLogTypePrefix(logType) +
        this.getId(id) +
        arg,
      ...args
    )
  }
}
