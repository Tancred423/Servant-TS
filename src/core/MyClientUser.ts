import { ClientUser } from 'discord.js'

export class MyClientUser {
  public clientUser: ClientUser
  public clientUserId: string

  constructor(clientUser: ClientUser) {
    this.clientUser = clientUser
    this.clientUserId = clientUser.id
  }

  setPresenceLoading() {
    this.clientUser.setPresence({
      status: 'dnd',
      activities: [
        {
          name: 'loading...',
          type: 'PLAYING',
        },
      ],
    })
  }

  setPresenceOnline() {
    this.clientUser.setPresence({
      status: 'online',
      activities: [
        {
          name: 'servant.gg',
          type: 'PLAYING',
        },
      ],
    })
  }
}
