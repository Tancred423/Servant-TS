import { CommandInteraction, InteractionReplyOptions } from 'discord.js'
import { Logger } from '../Logging/Logger'
import { LogTypes } from '../Logging/LogTypes'
import { ISendFunction } from './ISendFunction'

export class InteractionHelper {
  constructor(private readonly interaction: CommandInteraction) {}

  public async send(options: string | InteractionReplyOptions): Promise<void> {
    try {
      const interactionReplied =
        this.interaction.replied || this.interaction.deferred
      const interactionEphemeral = this.interaction.ephemeral ?? false

      if (typeof options === 'string') {
        if (interactionReplied) {
          await this.interaction.editReply(options)
        } else {
          await this.interaction.reply(options)
        }
      } else {
        const optionsEphemeral = options.ephemeral ?? false

        if (interactionReplied && interactionEphemeral !== optionsEphemeral) {
          if (!interactionEphemeral) await this.interaction.deleteReply()
          await this.interaction.followUp(options)
        } else if (interactionReplied) {
          await this.interaction.editReply(options)
        } else {
          await this.interaction.reply(options)
        }
      }
    } catch (error: any) {
      Logger.log(LogTypes.ERROR, 1653766177, error?.message)
    }
  }

  public static getSendFunction(
    interaction: CommandInteraction
  ): ISendFunction {
    const interactionHelper = new InteractionHelper(interaction)
    return interactionHelper.send.bind(interactionHelper)
  }
}
