import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import { ICommandExecuteFunction } from './ICommandExecuteFunction'

export class CommandDto {
  constructor(
    public readonly data: RESTPostAPIApplicationCommandsJSONBody,
    public readonly execute: ICommandExecuteFunction
  ) {}
}
