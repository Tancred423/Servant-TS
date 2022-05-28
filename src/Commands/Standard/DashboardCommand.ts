import { SlashCommandBuilder } from '@discordjs/builders'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js'
import { IDefaultVariables } from '../../Helpers/CommandHelper'
import { MyEmojis } from '../../Utility/Emojis'

export class DashboardCommand {
  public static getData(t: Function): RESTPostAPIApplicationCommandsJSONBody {
    return new SlashCommandBuilder()
      .setName(t('command_dashboard_name'))
      .setDescription(
        `[${t('command_category_standard')}] ${t('command_dashboard_info')}`
      )
      .toJSON()
  }

  public static async execute(
    interaction: CommandInteraction,
    defaultVariables: IDefaultVariables
  ): Promise<void> {
    const { guild, myGuild, t, send } = defaultVariables

    send({
      ephemeral: true,
      content: `${MyEmojis.POINT_DOWN} ${t('dashboard_clickHere')}`,
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setURL(myGuild.getDashboardLink())
            .setStyle('LINK')
            .setLabel(t('dashboard_label', { guildName: guild.name }))
            .setEmoji(MyEmojis.LINK)
        ),
      ],
    })
  }
}
