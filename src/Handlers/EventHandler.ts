import { MessageType, WAParticipantAction } from '@adiwajshing/baileys'
import chalk from "chalk";
//import { evaluate } from "mathjs";
import WAClient from "../lib/WAClient";
import Canvas from "discord-canvas";
import ordinal from "ordinal";
export default class EventHandler {
	constructor(public client: WAClient) {}

	handle = async (event: IEvent): Promise<void> => {
		const group = await this.client.fetchGroupMetadataFromWA(event.jid);
		this.client.log(
			`${chalk.blueBright("EVENT")} ${chalk.green(
				`${this.client.util.capitalize(event.action)}[${
					event.participants.length
				}]`
			)} in ${chalk.cyanBright(group?.subject || "Group")}`
		);
		const data = await this.client.getGroupData(event.jid);
		if (!data.events) return void null;
		const user = event.participants[0];
		const contact = this.client.getContact(user);
		const username =
			contact.notify || contact.vname || contact.name || user.split("@")[0];
		let pfp: string;
		try {
			pfp = await this.client.getProfilePicture(user);
		} catch (err) {
			pfp =
				"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
		}
		console.log(event.action);
		const groupData = await this.client.groupMetadata(event.jid);
		const memberCount = await ordinal(groupData.participants.length);
		const add = event.action === "add";
		const bye = event.action === "remove";
		const promote = event.action === "promote";
		const demote = event.action === "demote";
		/*const text = add
			? `${group.desc}\n\n*‣ ${event.participants
					.map((jid) => `@${jid.split("@")[0]}`)
					.join(", ")}*`
			: event.action === "remove"
			? `Goodbye *@${
					event.participants[0].split("@")[0]
			  }* Bye bye 👋.`
			: `Looks like *@${
					event.participants[0].split("@")[0]
			  }* got ${this.client.util.capitalize(event.action)}d${
					event.actor ? ` by *@${event.actor.split("@")[0]}*` : ""
			  }`;*/
		const contextInfo = {
			mentionedJid: event.actor
				? [...event.participants, event.actor]
				: event.participants,
		};
		if (add) {
			const welcome = await new Canvas.Welcome()
				.setUsername(username)
				.setDiscriminator(memberCount)
				.setMemberCount(memberCount)
				.setGuildName(group.subject)
				.setAvatar(pfp)
				.setColor("border", "#FFC0CB")
				.setColor("username-box", "#FFFFFF")
				.setColor("discriminator-box", "#FFFFFF")
				.setColor("message-box", "#FFFFFF")
				.setColor("title", "#FFFFFF")
				.setColor("avatar", "#00FF00")
				.setText("member-count", `- ${memberCount} member !`)
				.setText("title", "annyeong")
				.setText("message", `welcome to ${group.subject}`)
				.setBackground("https://i.ibb.co/8B6Q84n/LTqHsfYS.jpg")
				.toAttachment();
			return void (await this.client.sendMessage(
				event.jid,
				welcome.toBuffer(),
				MessageType.image,
				{
					caption: `${group.desc}\n\n*‣ ${event.participants
						.map((jid) => `@${jid.split("@")[0]}`)
						.join(", ")}*`,
					contextInfo,
				}
			));
		}
		if (promote) {
			const text = `Congratulations *@${
				event.participants[0].split("@")[0]
			}*, you're now an admin.`;
			return void this.client.sendMessage(
				event.jid,
				text,
				MessageType.extendedText,
				{ contextInfo }
			);
		}
		if (demote) {
			const text = ` Looks like *@${
				event.participants[0].split("@")[0]
			}* got demoted.`;
			return void this.client.sendMessage(
				event.jid,
				text,
				MessageType.extendedText,
				{ contextInfo }
			);
		}
	};
}

interface IEvent {
    jid: string
    participants: string[]
    actor?: string | undefined
    action: WAParticipantAction
}
