/** @format */

import Canvacord from "canvacord";
import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "affect",
			description: "This won't affect my baby, huh!",
			category: "fun",
			usage: `${client.config.prefix}trash [tag/quote]`,
			baseXp: 30,
		});
	}

	run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
            if (!joined) return void (await M.reply(`Please tag or quote anyone`));
            const image = joined.trim()
            await (M.WAMessage?.message?.imageMessage
		? this.client.downloadMediaMessage(M.WAMessage)
		: M.quoted?.message?.message?.imageMessage
	        ? this.client.downloadMediaMessage(M.quoted.message)
		: M.mentioned[0])
            const result = await Canvacord.Canvacord.affect(image);
	    await M.reply(
	        result,
	        MessageType.image,
	        undefined,
		undefined,
		undefined,
		undefined
	    );
	};
}
