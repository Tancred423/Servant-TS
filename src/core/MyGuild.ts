import { ApplicationCommandDataResolvable, Guild } from 'discord.js'
import config from '../config.json'
import { ITranslatorFunction } from '../Localization/ITranslatorFunction'
import { LanguageKeys } from '../Localization/LanguageKeys'
import { Translator } from '../Localization/Translator'
import { Logger } from '../Logging/Logger'
import { LogTypes } from '../Logging/LogTypes'
import { Comparators, QueryBuilder } from '../Utility/QueryBuilder'
import { Bot } from './Bot'
import { Database } from './Database'

export class MyGuild {
  public guild: Guild
  public guildId: string

  constructor(guild: Guild) {
    this.guild = guild
    this.guildId = guild.id
  }

  public async getTranslatorFunction(
    languageKey: LanguageKeys
  ): Promise<ITranslatorFunction> {
    return Translator.getFunction(languageKey)
  }

  public async getLanguageKey(): Promise<LanguageKeys> {
    const sql = new QueryBuilder()
      .select('language_code')
      .from('guilds')
      .where('guild_id', Comparators.EQUALS, this.guildId)
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
      Logger.log(LogTypes.ERROR, 1653568904, error.message)
    }

    return LanguageKeys[key]
  }

  public async updateCommands(): Promise<void> {
    try {
      const languageKey = await this.getLanguageKey()

      const commandDtos = Bot.commands.get(languageKey)
      if (!commandDtos)
        throw new Error(
          'Bot commands null for guild ' +
            this.guild.name +
            ' and language key ' +
            languageKey
        )

      const resolvables: ApplicationCommandDataResolvable[] = []

      commandDtos.forEach((commandDto) => {
        resolvables.push(commandDto.data as ApplicationCommandDataResolvable)
      })

      await this.guild.commands.set(resolvables)

      Logger.log(
        LogTypes.SUCCESS,
        1653500322,
        `${this.guild.name}: Updated successfully`
      )
    } catch (error: any) {
      Logger.log(
        LogTypes.ERROR,
        1653500325,
        `${this.guild.name}: ${error.message}`
      )
    }
  }

  public getDashboardLink(): string {
    return config.linkWebsite + config.pathDashboard + '/' + this.guildId
  }

  public getLeaderboardLink(): string {
    return config.linkWebsite + config.pathLeaderboard + '/' + this.guildId
  }
}
