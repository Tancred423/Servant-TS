import {
  Client,
  CommandInteraction,
  Guild,
  GuildMember,
  User,
} from 'discord.js'
import { MyGuild } from '../core/MyGuild'
import { MyUser } from '../core/MyUser'
import { ITranslatorFunction } from '../Localization/ITranslatorFunction'
import { LanguageKeys } from '../Localization/LanguageKeys'

export interface IDefaultVariables {
  client: Client<true>
  user: User
  myUser: MyUser
  userLanguageKey: LanguageKeys
  member: GuildMember
  guild: Guild
  myGuild: MyGuild
  guildLanguageKey: LanguageKeys
  t: ITranslatorFunction
}

export class CommandHelper {
  public static async getDefaultVariables(
    interaction: CommandInteraction
  ): Promise<IDefaultVariables> {
    const client = interaction.client
    const user = interaction.user
    const myUser = new MyUser(user)
    const userLanguageKey = await myUser.getLanguageKey()
    const member = interaction.member!! as GuildMember
    const guild = interaction.guild!!
    const myGuild = new MyGuild(guild)
    const guildLanguageKey = await myGuild.getLanguageKey()
    const t = await myGuild.getTranslatorFunction(guildLanguageKey)

    return {
      client,
      user,
      myUser,
      userLanguageKey,
      member,
      guild,
      myGuild,
      guildLanguageKey,
      t,
    }
  }
}
