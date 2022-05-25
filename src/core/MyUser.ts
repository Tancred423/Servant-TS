import { User } from 'discord.js'
import 'dotenv/config'
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

      if (res.length > 0) {
        const keyString = res['language_code'] as string

        if (typeof keyString === 'string')
          key = keyString.toUpperCase() as keyof typeof LanguageKeys
      }
    } catch (error: any) {
      Logger.log(LogTypes.ERROR, error.message, error.code)
    }

    return LanguageKeys[key]
  }
}
