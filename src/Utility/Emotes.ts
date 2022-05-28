import { Emoji } from 'discord.js'
import { Bot } from '../core/Bot'

export class Emotes {
  public static async getString(name: string): Promise<string> {
    return (await Emotes.get(name))?.toString() ?? ''
  }

  public static async get(name: string): Promise<Emoji | null> {
    const client = Bot.getClient()
    const servantsKingdom = client.guilds.cache.get('436925371577925642')
    const servantEmotes1 = client.guilds.cache.get('980170280376877128')

    if (!servantsKingdom || !servantEmotes1) return null

    switch (name) {
      case 'servantHighFiveL':
        return await servantsKingdom?.emojis.fetch('710393043790069770')

      case 'servantHighFiveR':
        return await servantsKingdom?.emojis.fetch('710393043790069811')

      case 'servantLove':
        return await servantsKingdom?.emojis.fetch('710393043827556412')

      default:
        return null
    }
  }
}
