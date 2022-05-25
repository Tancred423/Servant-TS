import { Client, CommandInteraction } from 'discord.js'
import config from '../config.json'
import { CommandHelper } from '../Helpers/CommandHelper'
import { Replacement } from '../Localization/Replacement'
import { Translator } from '../Localization/Translator'
import { Logger } from '../Logging/Logger'
import { LogTypes } from '../Logging/LogTypes'
import { MyClientUser } from './MyClientUser'
import { MyGuild } from './MyGuild'
import { MyUser } from './MyUser'
import { UserProperties } from './UserPropterties'

export class EventHandler {
  static async onReady(client: Client<true>) {
    const myClientUser = new MyClientUser(client.user)

    Logger.log(LogTypes.NORMAL, 1653500331, 'Starting up...')
    myClientUser.setPresenceLoading()

    for (const guild of client.guilds.cache) {
      if (config.updateCommandsOnStartup)
        await new MyGuild(guild[1]).updateCommands()
      else
        Logger.log(
          LogTypes.DEVELOPMENT,
          1653500335,
          `${guild[1].name}: Skipped`
        )
    }

    Logger.log(
      LogTypes.NORMAL,
      1653500377,
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
      CommandHelper.handle(interaction, commandName, userProperties)
    } catch (error: any) {
      Logger.log(LogTypes.ERROR, 1653500380, error.message)

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
