import { LanguageKeys } from '../Localization/LanguageKeys'

export class UserProperties {
  constructor(
    readonly languageKey: LanguageKeys,
    readonly translate: Function
  ) {}
}
