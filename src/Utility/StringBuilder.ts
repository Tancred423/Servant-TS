export class StringBuilder {
  private string: string

  constructor(string: string = '') {
    this.string = string
  }

  public set(string: string): StringBuilder {
    this.string = string
    return this
  }

  public append(string: string): StringBuilder {
    this.string += string
    return this
  }

  public build(): string {
    return this.string
  }
}
