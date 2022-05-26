import { ColorResolvable, User } from 'discord.js'
import config from '../config.json'
import { LanguageKeys } from '../Localization/LanguageKeys'
import { Logger } from '../Logging/Logger'
import { LogTypes } from '../Logging/LogTypes'
import { Database } from './Database'

export class MyUser {
  public user: User
  public userId: string

  constructor(user: User) {
    this.user = user
    this.userId = user.id
  }

  async getLanguageKey(): Promise<LanguageKeys> {
    const sql = `SELECT language_code
                 FROM   users
                 WHERE  user_id=${Database.escape(this.userId)}`

    let key = config.defaultLanguage as keyof typeof LanguageKeys

    try {
      const res = await Database.query(sql)

      if (typeof res === 'object' && res.hasOwnProperty('language_code')) {
        const keyString = res['language_code'] as string
        if (typeof keyString === 'string')
          key = keyString.toUpperCase() as keyof typeof LanguageKeys
      }
    } catch (error: any) {
      Logger.log(LogTypes.ERROR, 1653555689, error.message)
    }

    return LanguageKeys[key]
  }

  async getColor(): Promise<ColorResolvable> {
    return this.getColorCode() as unknown as ColorResolvable
  }

  async getColorCode(): Promise<string> {
    const sql = `SELECT color_code
                 FROM   users
                 WHERE  user_id=${Database.escape(this.userId)}`

    let color = config.defautColor

    try {
      const res = await Database.query(sql)

      if (typeof res === 'object' && res.hasOwnProperty('color_code')) {
        color = res['color_code']
      }
    } catch (error: any) {
      Logger.log(LogTypes.ERROR, 1653555694, error.message)
    }

    return color
  }
}
