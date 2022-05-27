import { ColorResolvable, User } from 'discord.js'
import config from '../config.json'
import { ITranslatorFunction } from '../Localization/ITranslatorFunction'
import { LanguageKeys } from '../Localization/LanguageKeys'
import { Translator } from '../Localization/Translator'
import { Logger } from '../Logging/Logger'
import { LogTypes } from '../Logging/LogTypes'
import { Comparators, QueryBuilder } from '../Utility/QueryBuilder'
import { Database } from './Database'

export class MyUser {
  public user: User
  public userId: string

  constructor(user: User) {
    this.user = user
    this.userId = user.id
  }

  public async getTranslatorFunction(
    languageKey: LanguageKeys
  ): Promise<ITranslatorFunction> {
    return Translator.getFunction(languageKey)
  }

  public async getLanguageKey(): Promise<LanguageKeys> {
    const sql = new QueryBuilder()
      .select('language_code')
      .from('users')
      .where('user_id', Comparators.EQUALS, this.userId)
      .build()

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

  public async getColor(): Promise<ColorResolvable> {
    return this.getColorCode() as unknown as ColorResolvable
  }

  public async getColorCode(): Promise<string> {
    const sql = new QueryBuilder()
      .select('color_code')
      .from('users')
      .where('user_id', Comparators.EQUALS, this.userId)
      .build()

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
