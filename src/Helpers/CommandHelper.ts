import { LanguageKeys } from '../Localization/LanguageKeys'
import { ApplicationCommandDataResolvable } from 'discord.js'
import { ApplicationCommandDataResolvableBuilder } from './ApplicationCommandDataResolvableBuilder'

export class CommandHelper {
  static getApplicationCommandDataResolvables(
    languageKey: LanguageKeys
  ): ApplicationCommandDataResolvable[] {
    return [
      new ApplicationCommandDataResolvableBuilder()
        .setName('ping')
        .setDescription('Shows latencies and uptime')
        .build(),
    ] // Todo: Db Connection
  }
}
