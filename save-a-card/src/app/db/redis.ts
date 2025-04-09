import { createClient } from 'redis';

export const client = createClient({
    username: 'default',
    password: 'LdWl5MNxhOQ4kKRJJXWoA4Lgwh8ZqU1m',
    socket: {
        host: 'redis-18204.c270.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 18204
    }
});

client.on('error', err => console.log('Redis Client Error', err));
await client.connect()


