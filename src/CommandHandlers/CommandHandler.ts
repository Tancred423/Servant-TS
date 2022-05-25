import { PingHandler } from './PingHandler'
import { CommandInteraction } from 'discord.js'
import { UserProperties } from '../core/UserPropterties'

export class CommandHandler {
  public static handle(
    interaction: CommandInteraction,
    commandName: string,
    userProperties: UserProperties
  ): void {
    switch (commandName.toLowerCase()) {
      case PingHandler.NAME:
        new PingHandler(interaction, userProperties).execute()
        break

      default:
        throw new Error(`Command "${commandName.toLowerCase()}" not found!`)
    }
  }
}
