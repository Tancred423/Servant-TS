import { SlashCommandBuilder } from '@discordjs/builders'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import { CommandInteraction } from 'discord.js'
import { DashboardCommand } from '../Commands/Standard/DashboardCommand'
import { LeaderboardCommand } from '../Commands/Standard/LeaderboardCommand'
import { PingCommand } from '../Commands/Standard/PingCommand'
import { UserProperties } from '../core/UserPropterties'
import { LanguageKeys } from '../Localization/LanguageKeys'

export class CommandHelper {
  public static handle(
    interaction: CommandInteraction,
    commandName: string,
    userProperties: UserProperties
  ): void {
    switch (commandName.toLowerCase()) {
      case PingCommand.NAME:
        new PingCommand(interaction, userProperties).execute()
        break

      case DashboardCommand.NAME:
        new DashboardCommand(interaction, userProperties).execute()
        break

      case LeaderboardCommand.NAME:
        new LeaderboardCommand(interaction, userProperties).execute()
        break

      default:
        throw new Error(`Command "${commandName.toLowerCase()}" not found!`)
    }
  }

  static getApplicationCommandDataResolvables(
    languageKey: LanguageKeys
  ): RESTPostAPIApplicationCommandsJSONBody[] {
    return [
      // Standard
      new SlashCommandBuilder()
        .setName('ping')
        .setDescription('[Standard] Shows latencies and uptime')
        .toJSON(),
      new SlashCommandBuilder()
        .setName('dashboard')
        .setDescription(
          '[Standard] Provides a link to the dashboard of this server'
        )
        .toJSON(),
      new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription(
          '[Standard] Provides a link to the leaderboard of this server'
        )
        .toJSON(),
    ] // Todo: Db Connection
  }
}
