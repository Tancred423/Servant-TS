import { SlashCommandBuilder } from '@discordjs/builders'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from 'discord.js'
import config from '../../config.json'
import { IDefaultVariables } from '../../Helpers/CommandHelper'
import { MyEmojis } from '../../Utility/Emojis'

export class DonateCommand {
  public static getData(t: Function): RESTPostAPIApplicationCommandsJSONBody {
    return new SlashCommandBuilder()
      .setName(t('command_donate_name'))
      .setDescription(
        `[${t('command_category_standard')}] ${t('command_donate_info')}`
      )
      .toJSON()
  }

  public static async execute(
    interaction: CommandInteraction,
    defaultVariables: IDefaultVariables
  ): Promise<void> {
    const { myUser, t, send } = defaultVariables

    const embed = new MessageEmbed()
      .setColor(await myUser.getColor())
      .setTitle(t('donate_title'))
      .setDescription(t('donate_description'))
      .addField(t('donate_patreonTitle'), t('donate_patreonDescription'), true)
      .addField(t('donate_paypalTitle'), t('donate_paypalDescription'), true)
      .addField(t('donate_boostTitle'), t('donate_boostDescription'), true)
      .setFooter({ text: t('donate_footer') })

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle('LINK')
        .setLabel(t('donate_button_patreon'))
        .setURL(config.linkPatreon)
        .setEmoji(MyEmojis.LINK),
      new MessageButton()
        .setStyle('LINK')
        .setLabel(t('donate_button_paypal'))
        .setURL(config.linkPaypal)
        .setEmoji(MyEmojis.LINK),
      new MessageButton()
        .setStyle('LINK')
        .setLabel(t('donate_button_boost'))
        .setURL(config.linkSupportServer)
        .setEmoji(MyEmojis.LINK)
    )

    await send({ embeds: [embed], components: [row] })
  }
}
