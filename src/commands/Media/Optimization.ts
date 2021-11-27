import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import axios from 'axios'
export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'optimization',
            description: 'to send people to jail who are horny',
            category: 'fun',
            usage: `${client.config.prefix}jail [(as caption | quote)[image] | @mention]`,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        const image = await (M.WAMessage?.message?.imageMessage
            ? this.client.downloadMediaMessage(M.WAMessage)
            : M.quoted?.message?.message?.imageMessage
            ? this.client.downloadMediaMessage(M.quoted.message)
            : M.mentioned[0])

            await axios.get(`http://api.resmush.it/ws.php?img=${image}&qlty=95`)
            .then((response)=>{
                M.reply(response.data)
            }).catch((e)=>{
                M.reply('sorry couldn\'t send the image')
            })

    }
}
