/*import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';

//////// Create a Redis client
//const redisClient = new Redis({
  //host: 'localhost', 
 // port: 6379,        
//});
// Create a Redis client (redis cloud)
//const redisClient = new Redis({
  //host: 'redis-18360.c304.europe-west1-2.gce.cloud.redislabs.com', //Redis Cloud hostname
 // port: '18360',     // Redis Cloud port
  //password: 'A6949s3vzwp38ae5jtv2q7ulz2if48623nuvn2k28vj5i9jfwvd', // Redis Cloud password
  // Other configuration options
//});

// Create the session store using the Redis client
//const RedisStore = new connectRedis(session);

//const RedisStore = session.Store; // Use the session.Store class directly
//const sessionStore = new RedisStore({ client: redisClient });








const RedisStore = new connectRedis(session);

// Create the session store using the RedisStore
const sessionStore = new RedisStore({
    host: 'redis-18360.c304.europe-west1-2.gce.cloud.redislabs.com', //Redis Cloud hostname
  port: '18360',     // Redis Cloud port
  password: 'A6949s3vzwp38ae5jtv2q7ulz2if48623nuvn2k28vj5i9jfwvd', // Redis Cloud password
  //url: 'your-redis-cloud-url', // Replace with your Redis Cloud URL
  tls: {
    // Enable TLS for secure connection (if provided by Redis Cloud)
    rejectUnauthorized: false // Use this if the certificate is self-signed or not verified
  }
});






export default sessionStore;*/
/*

import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';

const redisClient = new Redis({
  // Configuration for your Redis Cloud instance
  host: 'redis-18360.c304.europe-west1-2.gce.cloud.redislabs.com', //Redis Cloud hostname
  port: '18360',     // Redis Cloud port
  password: 'A6949s3vzwp38ae5jtv2q7ulz2if48623nuvn2k28vj5i9jfwvd', // Redis Cloud password
});

const RedisStore = new connectRedis(session);
console.log(redissClient);
export { RedisStore, redisClient }; // Export RedisStore and redisClient

// No need to create sessionStore here
*/

