import { LanguageKeys } from './LanguageKeys'
import deDe from './LanguageFiles/de_de.json'
import enGb from './LanguageFiles/en_gb.json'
import { Replacement } from './Replacement'

export class Translator {
  private static languageFiles = new Map<LanguageKeys, any>([
    [LanguageKeys.DE_DE, deDe],
    [LanguageKeys.EN_GB, enGb],
  ])

  private languageKey: LanguageKeys

  private constructor(languageKey: LanguageKeys) {
    this.languageKey = languageKey
  }

  private t(key: string, ...replacements: Replacement[]): string {
    const languageFile = Translator.languageFiles.get(this.languageKey) as {
      [key: string]: string
    }

    if (!languageFile)
      throw new Error(`Language file "${this.languageKey}" not found!`)

    let translation = languageFile[key]

    if (!translation) throw new Error(`Translation "${key}" not found!`)

    if (replacements.length > 0) {
      replacements.forEach((replacement) => {
        translation = translation.replace(
          `{${replacement.key}}`,
          replacement.value.toString()
        )
      })
    }

    return translation
  }

  static getFunction(languageKey: LanguageKeys): Function {
    const translator = new Translator(languageKey)
    return translator.t.bind(translator)
  }
}
