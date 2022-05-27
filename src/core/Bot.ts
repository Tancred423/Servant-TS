import { Client, Intents } from 'discord.js'
import 'dotenv/config'
import { CommandDto } from '../Commands/CommandDto'
import { DashboardCommand } from '../Commands/Standard/DashboardCommand'
import { DonateCommand } from '../Commands/Standard/DonateCommand'
import { HelpCommand } from '../Commands/Standard/HelpCommand'
import { LeaderboardCommand } from '../Commands/Standard/LeaderboardCommand'
import { PingCommand } from '../Commands/Standard/PingCommand'
import { LanguageKeys } from '../Localization/LanguageKeys'
import { Translator } from '../Localization/Translator'

export class Bot {
  public static commands = new Map<LanguageKeys, CommandDto[]>()

  public static initializeCommands(): void {
    for (const languageKeyString in LanguageKeys) {
      const languageKey =
        LanguageKeys[languageKeyString as keyof typeof LanguageKeys]
      const t = Translator.getFunction(languageKey)

      // Standard
      Bot.commands.set(languageKey, [
        new CommandDto(DashboardCommand.getData(t), DashboardCommand.execute),
        new CommandDto(DonateCommand.getData(t), DonateCommand.execute),
        new CommandDto(HelpCommand.getData(t), HelpCommand.execute),
        new CommandDto(
          LeaderboardCommand.getData(t),
          LeaderboardCommand.execute
        ),
        new CommandDto(PingCommand.getData(t), PingCommand.execute),
      ])
    }
  }

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
