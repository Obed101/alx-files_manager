import dbClient from '../utils/db.js';
import redisClient from '../utils/redis.js';

class AppController {
  static getStatus(req, res) {
    res.status(200);
    res.send({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  static async getStats(req, res) {
    res.status(200);
    res.send({
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    });
  }
}

export default AppController;
