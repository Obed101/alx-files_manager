import {createClient} from 'redis';

class RedisClient {
  constructor () {
    this.client = createClient();
		this.online = true;
   // console.log('Connected to the server')
    this.client.on('error', error => {
      console.log(error);
      this.online = false;
    });
  }

  isAlive () {
    return this.online;
  }

  async get (key) {
    this.client.get(key);
  }

  async set (key, value, duration) {
    this.client.set(key, value, 'EX', duration);
  }

  async del (key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
