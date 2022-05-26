import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'

export class CommandDto {
  constructor(
    public readonly data: RESTPostAPIApplicationCommandsJSONBody,
    public readonly execute: Function
  ) {}
}
