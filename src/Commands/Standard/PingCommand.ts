import { SlashCommandBuilder } from '@discordjs/builders'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import { CommandInteraction, MessageEmbed } from 'discord.js'
import moment from 'moment'
import { IDefaultVariables } from '../../Helpers/CommandHelper'

export class PingCommand {
  public static getData(t: Function): RESTPostAPIApplicationCommandsJSONBody {
    return new SlashCommandBuilder()
      .setName(t('command_ping_name'))
      .setDescription(
        `[${t('command_category_standard')}] ${t('command_ping_info')}`
      )
      .toJSON()
  }

  public static async execute(
    interaction: CommandInteraction,
    defaultVariables: IDefaultVariables
  ): Promise<void> {
    const { client, myUser, t, send } = defaultVariables

    const embed = new MessageEmbed()
      .setColor(await myUser.getColor())
      .addField(t('ping_botPing'), `_${t('ping_botPingValue')}_`, true)
      .addField(
        t('ping_wsPing'),
        t('ping_ms', { ping: client.ws.ping.toString() }),
        true
      )
      .addField(
        t('ping_lastRestart'),
        client.readyTimestamp ? moment(client.readyTimestamp).fromNow() : '-',
        true
      )

    const start = moment()

    await send({
      ephemeral: true,
      embeds: [embed],
    }).then(async (_) => {
      embed.fields[0].value = t('ping_ms', {
        ping: moment().diff(start, 'milliseconds').toString(),
      })

      await send({
        ephemeral: true,
        embeds: [embed],
      })
    })
  }
}
