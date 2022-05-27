import { SlashCommandBuilder } from '@discordjs/builders'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js'
import { IDefaultVariables } from '../../Helpers/CommandHelper'
import { Emojis } from '../../Utility/Emojis'

export class LeaderboardCommand {
  public static getData(t: Function): RESTPostAPIApplicationCommandsJSONBody {
    return new SlashCommandBuilder()
      .setName(t('command_name_leaderboard'))
      .setDescription(
        `[${t('command_category_standard')}] ${t('command_text_leaderboard')}`
      )
      .toJSON()
  }

  public static async execute(
    interaction: CommandInteraction,
    defaultVariables: IDefaultVariables
  ): Promise<void> {
    const { guild, myGuild, t } = defaultVariables

    interaction.reply({
      ephemeral: true,
      content: `${Emojis.POINT_DOWN} ${t('leaderboard_clickHere')}`,
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setURL(myGuild.getLeaderboardLink())
            .setStyle('LINK')
            .setLabel(t('leaderboard_label', { guildName: guild.name }))
            .setEmoji(Emojis.LINK)
        ),
      ],
    })
  }
}
