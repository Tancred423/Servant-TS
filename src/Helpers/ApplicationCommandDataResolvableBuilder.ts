import { ApplicationCommandDataResolvable } from 'discord.js'

export class ApplicationCommandDataResolvableBuilder {
  private name: string | null = null
  private description: string | null = null

  setName(name: string): ApplicationCommandDataResolvableBuilder {
    this.name = name
    return this
  }

  setDescription(description: string): ApplicationCommandDataResolvableBuilder {
    this.description = description
    return this
  }

  build(): ApplicationCommandDataResolvable {
    if (this.name === null || this.name === '')
      throw new Error('Command name cannot be null or empty')
    if (this.description === null || this.description === '')
      throw new Error(
        `Command (${this.name}) description cannot be null or empty`
      )

    return {
      name: this.name,
      description: this.description,
    } as ApplicationCommandDataResolvable
  }
}
