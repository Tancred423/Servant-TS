export enum MyEmojis {
  LINK = '🔗',
  POINT_DOWN = '👇',
}

export class Emojis {
  public static get(emojiName: string): MyEmojis | undefined {
    return MyEmojis[emojiName.toUpperCase() as keyof typeof MyEmojis]
  }
}
