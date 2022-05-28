import { InteractionReplyOptions } from 'discord.js'

export interface ISendFunction {
  (options: string | InteractionReplyOptions): Promise<void>
}
