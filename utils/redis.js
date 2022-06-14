const { createClient } = require("redis");

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on("error", error => console.log(error));
  }
  isAlive() {
    this.client.on("success", () => true);
    return false;
  }
  async get(key) {
    this.client.get(key);
  }
  async set(key, value, duration) {
    this.client.set(key, value, 'EX', duration);
  }
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
