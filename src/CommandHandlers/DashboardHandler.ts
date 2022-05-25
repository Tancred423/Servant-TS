import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js'
import 'dotenv/config'
import { MyGuild } from '../core/MyGuild'
import { UserProperties } from '../core/UserPropterties'
import { Replacement } from '../Localization/Replacement'
import { Emojis } from '../Utility/Emojis'

export class DashboardHandler {
  public static readonly NAME = 'dashboard'

  constructor(
    private interaction: CommandInteraction,
    private userProperties: UserProperties
  ) {}

  execute(): void {
    const t = this.userProperties.translate
    const guild = this.interaction.guild!!
    const myGuild = new MyGuild(guild)

    this.interaction.reply({
      ephemeral: true,
      content: '👇 Click here',
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
