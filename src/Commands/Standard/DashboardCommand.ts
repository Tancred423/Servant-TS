import { SlashCommandBuilder } from '@discordjs/builders'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js'
import { DefaultVariables } from '../../Helpers/CommandHelper'
import { Replacement } from '../../Localization/Replacement'
import { Emojis } from '../../Utility/Emojis'

export class DashboardCommand {
  public static getData(t: Function): RESTPostAPIApplicationCommandsJSONBody {
    return new SlashCommandBuilder()
      .setName(t('command_name_dashboard'))
      .setDescription(
        `[${t('command_category_standard')}] ${t('command_text_dashboard')}`
      )
      .toJSON()
  }

  public static async execute(
    interaction: CommandInteraction,
    defaultVariables: DefaultVariables
  ): Promise<void> {
    const { guild, myGuild, t } = defaultVariables

    interaction.reply({
      ephemeral: true,
      content: `${Emojis.POINT_DOWN} ${t('dashboard_clickHere')}`,
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setURL(myGuild.getDashboardLink())
            .setStyle('LINK')
            .setLabel(
              t('dashboard_label', new Replacement('guildName', guild.name))
            )
            .setEmoji(Emojis.LINK)
        ),
      ],
    })
  }
}
