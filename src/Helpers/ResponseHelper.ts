import { ColorResolvable, MessageEmbed } from 'discord.js'
import { MyUser } from '../core/MyUser'

export enum ResponseTypes {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

export class ResponseHelper {
  private static getColor(type: ResponseTypes): ColorResolvable | null {
    switch (type) {
      case ResponseTypes.SUCCESS:
        return 'GREEN'
      case ResponseTypes.WARNING:
        return 'YELLOW'
      case ResponseTypes.ERROR:
        return 'RED'
      case ResponseTypes.INFO:
        return 'BLUE'
      default:
        return null
    }
  }

  public static async getEmbed(
    type: ResponseTypes,
    myUser: MyUser,
    message: string
  ): Promise<MessageEmbed> {
    return new MessageEmbed()
      .setColor(this.getColor(type) ?? (await myUser.getColor()))
      .setDescription(message)
  }
}
