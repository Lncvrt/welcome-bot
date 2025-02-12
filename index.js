require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, Events } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]
});

client.once(Events.ClientReady, () => {
    console.log(`The bot is now online, using ${client.user.tag}.`);
});

client.on(Events.GuildMemberAdd, member => {
    const welcomeEmbed = new EmbedBuilder()
        .setColor(process.env.EMBED_COLOR)
        .setTitle(process.env.EMBED_TITLE
            .replace("{user.ping}", `<@${member.user.id}>`)
            .replace("{user.id}", member.user.id)
            .replace("{user.displayName}", member.user.displayName)
            .replace("{user.name}", member.user.username)
            .replace("{server.name}", member.guild.name)
            .replace("{server.memberCount}", member.guild.memberCount))
        .setDescription(process.env.EMBED_DESCRIPTION
            .replace("{user.ping}", `<@${member.user.id}>`)
            .replace("{user.id}", member.user.id)
            .replace("{user.displayName}", member.user.displayName)
            .replace("{user.name}", member.user.username)
            .replace("{server.name}", member.guild.name)
            .replace("{server.memberCount}", member.guild.memberCount))
        .setFooter({ text: process.env.EMBED_FOOTER, iconURL: process.env.EMBED_FOOTER_URL });

    if (process.env.EMBED_FOOTER_TIMESTAMP == "true") {
        welcomeEmbed.setTimestamp();
    }

    const channel = client.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
    if (channel) {
        channel.send({ embeds: [welcomeEmbed] });
    }
});

client.login(process.env.DISCORD_TOKEN);
