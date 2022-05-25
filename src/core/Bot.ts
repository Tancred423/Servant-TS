import { Client, Intents } from 'discord.js'
import 'dotenv/config'

export class Bot {
  private static INTENTS = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ]
  private static client: Client

  private constructor() {}

  public static getClient(): Client {
    if (!(Bot.client instanceof Client)) {
      Bot.client = new Client({ intents: Bot.INTENTS })
      Bot.client.login(process.env['DISCORD_TOKEN'])
    }

    return Bot.client
  }
}
