import { MyClientUser } from './MyClientUser'
import { Client, CommandInteraction } from 'discord.js'
import { Logger } from '../Logging/Logger'
import { LogTypes } from '../Logging/LogTypes'
import { MyGuild } from './MyGuild'
import { UserProperties } from './UserPropterties'
import { CommandHandler } from '../CommandHandlers/CommandHandler'
import { Replacement } from '../Localization/Replacement'
import { MyUser } from './MyUser'
import { Translator } from '../Localization/Translator'

export class EventHandler {
  static async onReady(client: Client<true>) {
    const myClientUser = new MyClientUser(client.user)

    Logger.log(LogTypes.NORMAL, 'Starting up...')
    myClientUser.setPresenceLoading()

    for (const guild of client.guilds.cache) {
      if (process.env.UPDATE_COMMANDS_ON_STARTUP)
        await new MyGuild(guild[1]).updateCommands()
      else Logger.log(LogTypes.DEVELOPMENT, `${guild[1].name}: Skipped`)
    }

    Logger.log(
      LogTypes.NORMAL,
      `${client.user.username} ready!\nGuilds: ${client.guilds.cache.size}`
    )
    myClientUser.setPresenceOnline()
  }

  static async onCommand(interaction: CommandInteraction) {
    const { commandName } = interaction
    const languageKey = await new MyUser(interaction.user).getLanguageKey()
    const t = Translator.getFunction(languageKey)
    const userProperties = new UserProperties(languageKey, t)

    try {
      CommandHandler.handle(interaction, commandName, userProperties)
    } catch (error: any) {
      Logger.log(LogTypes.ERROR, error.message)

      const reply = {
        ephemeral: true,
        content: t(
          'error_generic',
          new Replacement('inviteLink', '<https://support.servant.gg/>')
        ),
      }

      interaction.reply(reply)
    }
  }
}
