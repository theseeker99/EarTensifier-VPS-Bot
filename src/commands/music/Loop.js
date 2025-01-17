const { ApplicationCommandOptionType } = require('discord.js');
const Command = require('../../structures/Command');

module.exports = class Loop extends Command {
    constructor(client) {
        super(client, {
            name: 'loop',
            description: {
                content: 'Loops the current queue/song (song is looped by default if no argument is provided).',
            },
            aliases: ['repeat', 'unloop'],
            usage: '<queue/song>',
            cooldown: '4',
            voiceRequirements: {
                isInVoiceChannel: true,
                isInSameVoiceChannel: true,
                isPlaying: true,
            },
            options: [
                {
                    name: 'queue',
                    description: 'Loops the queue.',
                    type: ApplicationCommandOptionType.Subcommand,
                },
                {
                    name: 'song',
                    description: 'Loops the current song.',
                    type: ApplicationCommandOptionType.Subcommand,
                },
            ],
            slashCommand: true,
        });
    }

    async run(client, ctx, args) {
        const player = client.music.players.get(ctx.guild.id);

        if ((ctx.isInteraction && ctx.interaction.options.data[0].name == 'song') || (!ctx.isInteraction && (!args[0] || args[0].toLowerCase() == 'song'))) {
            if (!player.trackRepeat) {
                player.setTrackRepeat(true);
                return ctx.sendMessage('Song is now being looped');
            }
            else {
                player.setTrackRepeat(false);
                return ctx.sendMessage('Song has been unlooped');
            }
        }
        else if ((ctx.isInteraction && ctx.interaction.options.data[0].name == 'queue') || (!ctx.isInteraction && args[0] == 'queue')) {
            if (player.queueRepeat) {
                player.setQueueRepeat(false);
                return ctx.sendMessage('Queue has been unlooped.');
            }
            else {
                player.setQueueRepeat(true);
                return ctx.sendMessage('Queue is being looped.');
            }
        }
    }
};