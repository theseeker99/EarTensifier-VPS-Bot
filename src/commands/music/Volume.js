const Command = require('../../structures/Command');

const { EmbedBuilder } = require('discord.js');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class Volume extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            description: {
                content: 'Gets or sets the volume of the player.',
                usage: '[volume level (default is 100)]',
            },
            voiceRequirements: {
                isInVoiceChannel: true,
                inSameVoiceChannel: true,
                isPlaying: true,
            },
            options: [
                {
                    name: 'volume',
                    type: ApplicationCommandOptionType.Integer,
                    required: false,
                    description: 'The volume level to set the player to (default is 100).',
                },
            ],
            slashCommand: true,
        });
    }
    async run(client, ctx, args) {
        const player = client.music.players.get(ctx.guild.id);

        if (!args[0]) return ctx.sendMessage(`The current volume is set to: **${player.volume}%**`);

        if (args[0].toString().toLowerCase() == 'reset') {
            player.filter.resetVolume();
            const embed = new EmbedBuilder()
                .setAuthor({ name: `Volume has been reset to ${volume}%`, iconURL: ctx.author.displayAvatarURL() })
                .setColor(client.config.colors.default);
            return ctx.sendMessage({ embeds: [embed] });
        }

        let volume;
        if (args[0].toString().includes('%')) {
            volume = args[0].toString().replace('%', '');
        }
        else {
            volume = args[0];
        }

        if (isNaN(volume)) return ctx.sendMessage('Invalid number.');

        player.filter.setVolume(volume);

        const embed = new EmbedBuilder()
            .setAuthor({ name: `Volume set to ${volume}%`, iconURL: ctx.author.displayAvatarURL() })
            .setColor(client.config.colors.default);
        return ctx.sendMessage({ embeds: [embed] });
    }
};