import { SlashCommandBuilder } from '@discordjs/builders'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import { CommandInteraction } from 'discord.js'
import { DashboardHandler } from '../CommandHandlers/DashboardHandler'
import { PingHandler } from '../CommandHandlers/PingHandler'
import { UserProperties } from '../core/UserPropterties'
import { LanguageKeys } from '../Localization/LanguageKeys'

export class CommandHelper {
  public static handle(
    interaction: CommandInteraction,
    commandName: string,
    userProperties: UserProperties
  ): void {
    switch (commandName.toLowerCase()) {
      case PingHandler.NAME:
        new PingHandler(interaction, userProperties).execute()
        break

      case DashboardHandler.NAME:
        new DashboardHandler(interaction, userProperties).execute()
        break

      default:
        throw new Error(`Command "${commandName.toLowerCase()}" not found!`)
    }
  }

  static getApplicationCommandDataResolvables(
    languageKey: LanguageKeys
  ): RESTPostAPIApplicationCommandsJSONBody[] {
    return [
      new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows latencies and uptime')
        .toJSON(),
      new SlashCommandBuilder()
        .setName('dashboard')
        .setDescription('Provides a link to the dashboard of this server')
        .toJSON(),
    ] // Todo: Db Connection
  }
}
