import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'dadjoke',
            description: 'Gives you random Dad Joke.',
            aliases: ['djoke'],
            category: 'fun',
            usage: `${client.config.prefix}dadjoke`,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await axios
            .get(`https://icanhazdadjoke.com/`)
            .then((response) => {
                // console.log(response);
                const text = `Joke: ${response.data.joke}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(` ${err}`)
            })
    }
}