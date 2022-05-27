import { Replacement } from './Replacement'

export interface TranslatorFunction {
  (key: string, replacements?: Replacement): string
}
