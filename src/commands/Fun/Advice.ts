import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'advice',
            aliases: ['adv'],
            description: 'Gives you a random advice 🤪',
            category: 'fun',
            usage: `${client.config.prefix}advice`,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://api.adviceslip.com/advice`)
            .then((response) => {
                // console.log(response);
                const text = `*Advice for you ${M.sender.username}:* ${response.data.slip.advice}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
