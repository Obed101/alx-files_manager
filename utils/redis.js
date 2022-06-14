import {createClient} from 'redis';

class RedisClient {
  constructor () {
    this.client = createClient();
		this.offline = false;
   // console.log('Connected to the server')
    this.client.on('error', error => {
      console.log(error);
      this.offline = true;
    });
  }

  isAlive () {
    console.log(this.offline)
    return this.client.connected;
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
