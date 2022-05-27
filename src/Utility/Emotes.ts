import { Emoji } from 'discord.js'
import { Bot } from '../core/Bot'

export class Emotes {
  public static async getString(name: string): Promise<string> {
    return (await Emotes.get(name))?.toString() ?? ''
  }

  public static async get(name: string): Promise<Emoji | null> {
    const client = Bot.getClient()
    const servantsKingdom = client.guilds.cache.get('436925371577925642')

    if (!servantsKingdom) return null

    switch (name) {
      case 'servantHighFiveL':
        return await servantsKingdom?.emojis.fetch('710393043790069770')

      case 'servantHighFiveR':
        return await servantsKingdom?.emojis.fetch('710393043790069811')

      default:
        return null
    }
  }
}
