import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js'
import { MyGuild } from '../../core/MyGuild'
import { UserProperties } from '../../core/UserPropterties'
import { Replacement } from '../../Localization/Replacement'
import { Emojis } from '../../Utility/Emojis'

export class LeaderboardCommand {
  public static readonly NAME = 'leaderboard'

  constructor(
    private interaction: CommandInteraction,
    private userProperties: UserProperties
  ) {}

  async execute(): Promise<void> {
    const t = this.userProperties.translate
    const guild = this.interaction.guild!!
    const myGuild = new MyGuild(guild)

    this.interaction.reply({
      ephemeral: true,
      content: '👇 Click here',
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