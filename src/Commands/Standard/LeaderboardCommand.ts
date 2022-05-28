import { SlashCommandBuilder } from '@discordjs/builders'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js'
import { IDefaultVariables } from '../../Helpers/CommandHelper'
import { MyEmojis } from '../../Utility/Emojis'

export class LeaderboardCommand {
  public static getData(t: Function): RESTPostAPIApplicationCommandsJSONBody {
    return new SlashCommandBuilder()
      .setName(t('command_leaderboard_name'))
      .setDescription(
        `[${t('command_category_standard')}] ${t('command_leaderboard_info')}`
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
      content: `${MyEmojis.POINT_DOWN} ${t('leaderboard_clickHere')}`,
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setURL(myGuild.getLeaderboardLink())
            .setStyle('LINK')
            .setLabel(t('leaderboard_label', { guildName: guild.name }))
            .setEmoji(MyEmojis.LINK)
        ),
      ],
    })
  }
}
