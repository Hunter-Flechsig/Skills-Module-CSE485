import { createClient } from 'redis';

export const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 18204,
    }
});

client.on('error', err => console.log('Redis Client Error', err));
await client.connect()


