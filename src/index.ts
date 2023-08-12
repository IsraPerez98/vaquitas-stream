import dotenv from 'dotenv';
dotenv.config();
import { VoiceChannel } from 'discord.js-selfbot-v13';
import { client, StreamClient } from './client';

const CLIENT_TOKEN = process.env.CLIENT_TOKEN || '';
const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID || '';
const STREAM_URL= process.env.STREAM_URL || '';

async function createStream() {
    // Login
    await client.login(CLIENT_TOKEN);

    // Connect to a voice channel
    const voiceConnection = await StreamClient.joinVoiceChannel(
        client.channels.cache.get(VOICE_CHANNEL_ID) as VoiceChannel,
        {
            selfDeaf: false,
            selfMute: true,
            selfVideo: false,
        },
    );
    // Create a stream
    const streamConnection = await voiceConnection.createStream();
    // Create a player
    /*
    const player = StreamClient.createPlayer(
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // DIRECT VIDEO URL OR READABLE STREAM HERE
        streamConnection.udp, // UDP connection
    );
    */

    if(!streamConnection || !streamConnection.udp) {
        console.log('Stream connection || streamConnection.udp is null');
        process.exit(1);
    }

    const player = StreamClient.createPlayer(
        STREAM_URL, // DIRECT VIDEO URL OR READABLE STREAM HERE
        streamConnection.udp, // UDP connection
    );

    // Events
    player.on('start', () => {
        console.log('Started playing');
    });
    player.on('finish', () => {
        console.log('Finished playing');
    });
    // Play video !!!
    player.play();
    // Stop playing

}


createStream();
