const { createClient } = require("redis");
const client = createClient();

class RedisClient {
  constructor() {
    client.on("error", error => console.log(error));
  }
  isAlive() {
    client.on("success", () => true);
    return false;
  }
  async get(key) {
    client.get(key);
  }
  async set(key, value, duration) {
    client.set(key, value, 'EX', duration);
  }
  async del(key) {
    client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
