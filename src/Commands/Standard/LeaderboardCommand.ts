import { SlashCommandBuilder } from '@discordjs/builders'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js'
import { DefaultVariables } from '../../Helpers/CommandHelper'
import { Replacement } from '../../Localization/Replacement'
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

    interaction.reply({
      ephemeral: true,
      content: `${Emojis.POINT_DOWN} ${t('leaderboard_clickHere')}`,
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setURL(myGuild.getLeaderboardLink())
            .setStyle('LINK')
            .setLabel(
              t('leaderboard_label', new Replacement('guildName', guild.name))
            )
            .setEmoji(Emojis.LINK)
        ),
      ],
    })
  }
}
