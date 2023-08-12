import dotenv from 'dotenv';
dotenv.config();
import { Client } from 'discord.js-selfbot-v13';
import { DiscordStreamClient } from 'discord-stream-client';

const client = new Client();
const StreamClient = new DiscordStreamClient(client);

StreamClient.setResolution('720p');
// StreamClient.setVideoCodec('VP8'); // H264 is default

//await client.login(CLIENT_TOKEN);

export { client, StreamClient };
