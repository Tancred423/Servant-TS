declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_TOKEN: string
      APPLICATION_ID: string
      GUILD_ID: string
      UPDATE_COMMANDS_ON_STARTUP: boolean
      DEFAULT_LANGUAGE: string
    }
  }
}

export {}
