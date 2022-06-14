import {createClient} from 'redis';
import { promisify } from 'util';

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
    const getAsync = promisify(this.client.get).bind(this.client);
    return getAsync(key);
  }

  async set (key, value, duration) {
    this.client.set(key, value, 'EX', duration, function (error) {
      if (error) {
        return error;
      }
    });
  }

  async del (key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
