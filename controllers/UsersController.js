import dbClient from '../utils/db.js';
import sha1 from 'sha1';

export default class UsersController {
  static async postNew (req, res) {
    const email = req.body.email ? req.body.email : null;
    let password = req.body.password ? req.body.password : null;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }
    const exist = await dbClient.db.collection('users').findOne({ email });

    if (exist) {
      return res.status(400).json({ error: 'Already exist' });
    }
    password = sha1(password);
    const addToDb = await dbClient.db.collection('users').insertOne({ email, password: password });
    const id = addToDb.insertedId.toString();

    res.status(201).json({ email, id: id });
  }

  static async getMe (req, res) {
    const token = req.headers['X-Token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Basic Authentication
    const basic = req.headers.get('Authorization').split(' ')[1];
    const credentials = Buffer.from(basic, 'base64').toString('ascii');
    const [_email, _] = credentials.split(':');
    
    return res.status(200).json({ email: _email, id: res._id.toString });
  }
}
