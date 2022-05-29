import { CommandInteraction } from 'discord.js'
import { IDefaultVariables } from '../Helpers/CommandHelper'

export interface ICommandExecuteFunction {
  (
    interaction: CommandInteraction,
    defaultVariables: IDefaultVariables
  ): Promise<void>
}
