import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'gaycheck',
            description: 'Generally used to check if bot is Up',
            category: 'general',
            aliases: ['gaymeter', 'howgay'],
            usage: `${client.config.prefix}hi`,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        if (!M.mentioned.length) return void M.reply(`Please tag the user for checking gayness`)
        M.mentioned.forEach(async (user) => {
            const usr = this.client.contacts[user]
            const username = usr.notify || usr.vname || usr.name || user.split('@')[0]
          
       
            await M.reply(`how gay is ${username} ❓\n\n${username}is ${Math.floor(Math.random() * 101)}% gay 👽`)
        })
    }
}
