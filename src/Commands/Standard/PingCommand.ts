import { SlashCommandBuilder } from '@discordjs/builders'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import { CommandInteraction, MessageEmbed } from 'discord.js'
import moment from 'moment'
import { DefaultVariables } from '../../Helpers/CommandHelper'
import { Replacement } from '../../Localization/Replacement'

export class PingCommand {
  public static getData(t: Function): RESTPostAPIApplicationCommandsJSONBody {
    return new SlashCommandBuilder()
      .setName(t('command_name_ping'))
      .setDescription(
        `[${t('command_category_standard')}] ${t('command_text_ping')}`
      )
      .toJSON()
  }

  public static async execute(
    interaction: CommandInteraction,
    defaultVariables: DefaultVariables
  ): Promise<void> {
    const {
      client,
      user,
      myUser,
      userLanguageKey,
      t,
      guild,
      myGuild,
      guildLanguageKey,
    } = defaultVariables

    const embed = new MessageEmbed()
      .setColor(await myUser.getColor())
      .addField(t('ping_botPing'), `_${t('ping_botPingValue')}_`, true)
      .addField(
        t('ping_wsPing'),
        t('ping_ms', new Replacement('ping', client.ws.ping)),
        true
      )
      .addField(
        t('ping_lastRestart'),
        client.readyTimestamp ? moment(client.readyTimestamp).fromNow() : '-',
        true
      )

    const start = moment()

    interaction.reply({ ephemeral: true, embeds: [embed] }).then((_) => {
      embed.fields[0].value = t(
        'ping_ms',
        new Replacement('ping', moment().diff(start, 'milliseconds'))
      )

      interaction.editReply({
        embeds: [embed],
      })
    })
  }
}
