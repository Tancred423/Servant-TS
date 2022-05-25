import { CommandInteraction, MessageEmbed } from 'discord.js'
import moment from 'moment'
import { Replacement } from '../Localization/Replacement'
import { UserProperties } from '../core/UserPropterties'
import { Bot } from '../core/Bot'

export class PingHandler {
  public static readonly NAME = 'ping'

  constructor(
    private interaction: CommandInteraction,
    private userProperties: UserProperties
  ) {}

  execute(): void {
    const t = this.userProperties.translate
    const client = Bot.getClient()

    const embed = new MessageEmbed()
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

    this.interaction.reply({ embeds: [embed] }).then((_) => {
      embed.fields[0].value = t(
        'ping_ms',
        new Replacement('ping', moment().diff(start, 'milliseconds'))
      )

      this.interaction.editReply({
        embeds: [embed],
      })
    })
  }
}
