import mongodb from 'mongodb';

class DBClient {
  constructor () {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${this.host}:${this.port}`;
    this.client = new mongodb.MongoClient(url, { useUnifiedTopology: true });
    this.client.connect();
    this.db = this.client.db(this.database);
  }

  isAlive () {
    return this.client.isConnected();
  }

  async nbUsers () {
    return await this.db.collection('users').countDocuments();
  }

  async nbFiles () {
    return await this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
