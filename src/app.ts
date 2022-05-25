import { Client } from 'discord.js'
import { EventHandler } from './core/EventHandler'
import { Bot } from './core/Bot'

const client = Bot.getClient()

client.on('ready', async (client: Client<true>) => {
  EventHandler.onReady(client)
})

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) EventHandler.onCommand(interaction)
})
