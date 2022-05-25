import { Client } from 'discord.js'
import { Bot } from './core/Bot'
import { EventHandler } from './core/EventHandler'

const client = Bot.getClient()

client.on('ready', async (client: Client<true>) => {
  EventHandler.onReady(client)
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.guild) return
  if (interaction.isCommand()) EventHandler.onCommand(interaction)
})
