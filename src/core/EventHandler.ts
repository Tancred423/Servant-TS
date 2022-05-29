import { Client, CommandInteraction } from 'discord.js'
import moment from 'moment'
import config from '../config.json'
import { CommandHelper } from '../Helpers/CommandHelper'
import { StringHelper } from '../Helpers/StringHelper'
import { Logger } from '../Logging/Logger'
import { LogTypes } from '../Logging/LogTypes'
import { StringBuilder } from '../Utility/StringBuilder'
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
    const start = moment()

    const { commandName } = interaction
    const defaultVariables = await CommandHelper.getDefaultVariables(
      interaction
    )
    const { user, guild, guildLanguageKey, t, send } = defaultVariables

    try {
      const commands = Bot.commands.get(guildLanguageKey)
      const command = commands?.find(
        (element) => element.data.name === commandName
      )

      await command?.execute(interaction, defaultVariables)

      Logger.log(
        LogTypes.SUCCESS,
        1653820062,
        new StringBuilder()
          .append('Command: "/')
          .append(commandName)
          .append(CommandHelper.getOptionsString(interaction.options))
          .append('" | User: "')
          .append(StringHelper.getFullUserName(user))
          .append('" (')
          .append(user.id)
          .append(') | Guild: "')
          .append(guild.name)
          .append('" (')
          .append(guild.id)
          .append(') | Execution time: ')
          .append(moment().diff(start, 'milliseconds').toString())
          .append(' ms')
          .build()
      )
    } catch (error: any) {
      Logger.log(LogTypes.ERROR, 1653500380, error.message)

      send({
        ephemeral: true,
        content: t('error_generic', {
          inviteLink: `<${config.linkSupportServer}>`,
        }),
      })
    }
  }
}
