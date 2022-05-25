import { ApplicationCommandDataResolvable, Guild } from 'discord.js'
import 'dotenv/config'
import config from '../config.json'
import { CommandHelper } from '../Helpers/CommandHelper'
import { LanguageKeys } from '../Localization/LanguageKeys'
import { Logger } from '../Logging/Logger'
import { LogTypes } from '../Logging/LogTypes'
import { Database } from './Database'

export class MyGuild {
  public guild: Guild
  public guildId: string

  constructor(guild: Guild) {
    this.guild = guild
    this.guildId = guild.id
  }

  public async getLanguageKey(): Promise<LanguageKeys> {
    const sql = `SELECT language_code
                 FROM   guilds
                 WHERE  guild_id=${Database.escape(this.guildId)}`

    let key = config.defaultLanguage as keyof typeof LanguageKeys

    try {
      const res = await Database.query(sql)

      if (res.length > 0) {
        const keyString = res['language_code'] as string

        if (typeof keyString === 'string')
          key = keyString.toUpperCase() as keyof typeof LanguageKeys
      }
    } catch (error: any) {
      Logger.log(LogTypes.ERROR, 1653500291, error.message)
    }

    return LanguageKeys[key]
  }

  public async updateCommands(): Promise<void> {
    const languageKey = await this.getLanguageKey()

    try {
      const applicationCommandDataResolvables =
        CommandHelper.getApplicationCommandDataResolvables(
          languageKey
        ) as ApplicationCommandDataResolvable[]

      await this.guild.commands.set(applicationCommandDataResolvables)
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
}
