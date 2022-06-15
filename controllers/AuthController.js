/* eslint-disable no-unused-vars */
import sha1 from 'sha1';
import { v4 } from 'uuid';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export default class AuthController {
  static async getConnect(req, res) {
    const token = v4;
    await redisClient.set(`auth_${token}`, req._id.toString(), 24 * 60 * 60);
    return res.status(200).json({ token });
  }

  static async getDisconnect(req, res) {
    const token = req.headers['X-Token'];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    await redisClient.del(`auth_${token}`);
    return res.status(204);
  }
}
