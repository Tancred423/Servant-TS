import { SlashCommandBuilder } from '@discordjs/builders'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import { CommandInteraction, GuildMember, MessageEmbed } from 'discord.js'
import { IDefaultVariables } from '../../Helpers/CommandHelper'
import { StringHelper } from '../../Helpers/StringHelper'

export class AvatarCommand {
  public static getData(t: Function): RESTPostAPIApplicationCommandsJSONBody {
    return new SlashCommandBuilder()
      .setName(t('command_avatar_name'))
      .setDescription(
        `[${t('command_category_fun')}] ${t('command_avatar_info')}`
      )
      .addUserOption((option) =>
        option
          .setName(t('command_avatar_option_user_name'))
          .setDescription(t('command_avatar_option_user_info'))
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName(t('command_avatar_option_hidden_name'))
          .setDescription(t('command_avatar_option_hidden_info'))
          .setChoices(
            {
              name: t('command_avatar_option_hidden_choice_hidden'),
              value: 'hidden',
            },
            {
              name: t('command_avatar_option_hidden_choice_visible'),
              value: 'visible',
            }
          )
          .setRequired(false)
      )
      .toJSON()
  }

  public static async execute(
    interaction: CommandInteraction,
    defaultVariables: IDefaultVariables
  ): Promise<void> {
    const { user, myUser, t, send } = defaultVariables

    const member = interaction.options.getMember(
      t('command_avatar_option_user_name')
    ) as GuildMember

    const hidden =
      interaction.options.getString(t('command_avatar_option_hidden_name')) ===
        'hidden' ?? false

    let avatarUrl = member.displayAvatarURL({ dynamic: true })
    if (avatarUrl.endsWith('.webp'))
      avatarUrl = avatarUrl.replace('.webp', '.png')
    avatarUrl += '?size=2048'

    const embed = new MessageEmbed()
      .setColor(await myUser.getColor())
      .setTitle(
        t('avatar_of', {
          nickname: member.displayName,
          usernameWithDiscriminator: StringHelper.getFullUserName(user),
        })
      )
      .setDescription(t('avatar_openInBrowser', { link: avatarUrl }))
      .setImage(avatarUrl)

    await send({ ephemeral: hidden, embeds: [embed] })
  }
}
