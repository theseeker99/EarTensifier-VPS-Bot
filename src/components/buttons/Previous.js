const { EmbedBuilder } = require('discord.js');
const Button = require('../../structures/Button');

module.exports = class Previous extends Button {
    constructor(client) {
        super(client, {
            id: 'PREVIOUS_BUTTON',
        });
    }
    async run(client, interaction) {
        if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(interaction.member.voice.channel)) return;
        const player = client.music.players.get(interaction.guild.id);
        if (!player) return;

        if (player.queue.previous) {
            player.queue.unshift(player.queue.previous);
            player.skip();

            const embed = new EmbedBuilder()
                .setColor(client.config.colors.default)
                .setAuthor({ name: `Backing up to ${player.queue.current.title}`, iconURL: interaction.member.displayAvatarURL() });
            await player.textChannel.send({ embeds: [embed] });
        }
    }
};