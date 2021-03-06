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
import { Emotes } from '../../Utility/Emotes'

export class HelpCommand {
  public static getData(t: Function): RESTPostAPIApplicationCommandsJSONBody {
    return new SlashCommandBuilder()
      .setName(t('command_help_name'))
      .setDescription(
        `[${t('command_category_standard')}] ${t('command_help_info')}`
      )
      .toJSON()
  }

  public static async execute(
    interaction: CommandInteraction,
    defaultVariables: IDefaultVariables
  ): Promise<void> {
    const { client, myUser, member, t, send } = defaultVariables

    const embed = new MessageEmbed()
      .setColor(await myUser.getColor())
      .setTitle(
        t('help_title', {
          userName: member.displayName,
          servantHighFiveL: await Emotes.getString('servantHighFiveL'),
          servantHighFiveR: await Emotes.getString('servantHighFiveR'),
        })
      )
      .setDescription(
        t('help_description', {
          faqLink:
            config.linkWebsite +
            config.pathFaq +
            '#what-are-categories-commands-features-plugins',
        })
      )
      .setThumbnail(client.user.displayAvatarURL())
      .addField(
        t('help_gettingStarted_title'),
        t('help_gettingStarted_description'),
        false
      )
      .addField(t('help_howTo_title'), t('help_howTo_description'), false)
      .addField(
        t('help_permissionSystem_title'),
        t('help_permissionSystem_description'),
        false
      )

    const row = new MessageActionRow().addComponents([
      new MessageButton()
        .setLabel(t('help_button_website'))
        .setEmoji(MyEmojis.LINK)
        .setStyle('LINK')
        .setURL(config.linkWebsite),
      new MessageButton()
        .setLabel(t('help_button_invite'))
        .setEmoji(MyEmojis.LINK)
        .setStyle('LINK')
        .setURL(config.linkInviteServant),
      new MessageButton()
        .setLabel(t('help_button_support'))
        .setEmoji(MyEmojis.LINK)
        .setStyle('LINK')
        .setURL(config.linkSupportServer),
    ])

    await send({ embeds: [embed], components: [row] })
  }
}
