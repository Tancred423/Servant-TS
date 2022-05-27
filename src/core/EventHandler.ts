import { Client, CommandInteraction } from 'discord.js'
import config from '../config.json'
import { CommandHelper } from '../Helpers/CommandHelper'
import { Logger } from '../Logging/Logger'
import { LogTypes } from '../Logging/LogTypes'
import { Bot } from './Bot'
import { MyClientUser } from './MyClientUser'
import { MyGuild } from './MyGuild'

export class EventHandler {
  public static async onReady(client: Client<true>) {
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

  public static async onCommand(interaction: CommandInteraction) {
    const { commandName } = interaction
    const defaultVariables = await CommandHelper.getDefaultVariables(
      interaction
    )

    try {
      const commands = Bot.commands.get(defaultVariables.guildLanguageKey)
      const command = commands?.find(
        (element) => element.data.name === commandName
      )

      await command?.execute(interaction, defaultVariables)
    } catch (error: any) {
      Logger.log(LogTypes.ERROR, 1653500380, error.message)

      interaction.reply({
        ephemeral: true,
        content: defaultVariables.t('error_generic', {
          inviteLink: `<${config.linkSupportServer}>`,
        }),
      })
    }
  }
}
