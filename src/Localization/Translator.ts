import { IReplacement } from './IReplacement'
import de_de from './LanguageFiles/de_de.json'
import en_gb from './LanguageFiles/en_gb.json'
import { LanguageKeys } from './LanguageKeys'

export class Translator {
  private static languageFiles = new Map<string, any>([
    [LanguageKeys.DE_DE, de_de],
    [LanguageKeys.EN_GB, en_gb],
  ])

  private languageKey: LanguageKeys

  private constructor(languageKey: LanguageKeys) {
    this.languageKey = languageKey
  }

  private t(key: string, replacements?: IReplacement): string {
    const languageFile = Translator.languageFiles.get(this.languageKey) as {
      [key: string]: string
    }

    if (!languageFile)
      throw new Error(`Language file "${this.languageKey}" not found!`)

    let translation = languageFile[key]

    if (!translation) throw new Error(`Translation "${key}" not found!`)

    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, replacement]) => {
        translation = translation.replace(`{${placeholder}}`, replacement)
      })
    }

    return translation
  }

  public static getFunction(languageKey: LanguageKeys): Function {
    const translator = new Translator(languageKey)
    return translator.t.bind(translator)
  }
}
