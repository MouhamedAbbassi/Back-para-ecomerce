import Redis from 'ioredis';
import RedisStore from 'connect-redis';

// Create a Redis client
const redisClient = new Redis({
  host: 'redis-18360.c304.europe-west1-2.gce.cloud.redislabs.com',
  port: 18360,
  password: 'Et9sDbDfT1Ngp4fiwnpEOxthQjKPZQZt',
});

// Create a Redis session store
const redisStore = new RedisStore({
  client: redisClient,
});

export default redisStore;
