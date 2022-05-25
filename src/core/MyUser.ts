import 'dotenv/config'
import { User } from 'discord.js'
import { LanguageKeys } from '../Localization/LanguageKeys'
import { Database } from './Database'
import { Logger } from '../Logging/Logger'
import { LogTypes } from '../Logging/LogTypes'

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

    let key = process.env.DEFAULT_LANGUAGE as keyof typeof LanguageKeys

    try {
      const res = await Database.query(sql)
      const keyString = res['language_code'] as string

      if (typeof keyString === 'string')
        key = keyString.toUpperCase() as keyof typeof LanguageKeys
    } catch (error: any) {
      Logger.log(LogTypes.ERROR, error.message, error.code)
    }

    return LanguageKeys[key]
  }
}
