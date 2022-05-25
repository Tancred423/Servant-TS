import 'dotenv/config'
import { LanguageKeys } from '../Localization/LanguageKeys'
import { Guild } from 'discord.js'
import { CommandHelper } from '../Helpers/CommandHelper'
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

  async getLanguageKey(): Promise<LanguageKeys> {
    const sql = `SELECT language_code
                 FROM   guilds
                 WHERE  guild_id=${Database.escape(this.guildId)}`

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

  async updateCommands() {
    const languageKey = this.getLanguageKey()

    try {
      const applicationCommandDataResolvables =
        CommandHelper.getApplicationCommandDataResolvables(
          await this.getLanguageKey()
        )

      await this.guild.commands.set(applicationCommandDataResolvables)
      Logger.log(LogTypes.SUCCESS, `${this.guild.name}: Updated successfully`)
    } catch (error: any) {
      Logger.log(LogTypes.ERROR, `${this.guild.name}: ${error.message}`)
    }
  }
}
