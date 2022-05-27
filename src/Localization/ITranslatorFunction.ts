import { IReplacement } from './IReplacement'

export interface ITranslatorFunction {
  (key: string, replacements?: IReplacement): string
}
