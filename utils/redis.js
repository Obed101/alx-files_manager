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
    this.client.get(key, (_, value) => {
			if (_) {
				console.log(_)
			}      
			return value;
    });
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
