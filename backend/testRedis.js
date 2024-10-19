// backend/testRedis.js

const { createClient } = require('redis');

async function testRedis() {
    const redisHost = process.env.REDIS_HOST || 'localhost';
    const redisPort = process.env.REDIS_PORT || 6379;

    const client = createClient({
        url: `redis://${redisHost}:${redisPort}`
    });

    client.on('error', (err) => console.error('Redis Client Error', err));

    try {
        await client.connect();
        console.log('Conectado a Redis');
        await client.ping();
        console.log('PING recibido: PONG');
    } catch (err) {
        console.error('Error conectando a Redis:', err);
    } finally {
        await client.disconnect();
    }
}

testRedis();
