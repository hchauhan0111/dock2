const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
  host: 'localhost', // Your Redis container or server hostname
  port: 6379         // Default Redis port
});

// Handle Redis errors
redisClient.on('error', (err) => {
  console.error('Redis error: ' + err);
});

// Function to check cache and fall back to DB if necessary
const checkCache = (key, dbQueryFunction) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        console.log('Cache hit');
        resolve(JSON.parse(data)); // Return data from cache
      } else {
        console.log('Cache miss');
        // Query the DB as the cache is not available
        dbQueryFunction()
          .then(dbData => {
            // Save the result in Redis for future use (cache)
            redisClient.setex(key, 3600, JSON.stringify(dbData)); // Cache expires in 1 hour
            resolve(dbData);
          })
          .catch(dbError => reject(dbError));
      }
    });
  });
};

module.exports = { checkCache };

