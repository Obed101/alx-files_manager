const mongodb = require('mongodb');
const Collection = require('mongodb/lib/collection');
const MongoClient = mongodb.MongoClient;
class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient;
  }
  isAlive() {
    const url = `mongodb://${this.host}:${this.port}`;
    return this.client.connect(url, (error) => {
      if (error) {
        return false
      }
      return true
    });
  }
  async nbUsers() {
    const db = this.client.db(this.database);
    return await db.collection('users').find({}).toArray();
  }
  async nbFiles() {
    const db = this.client.db(this.database);
    return await db.collection('files').find({}).toArray();
  }
}

const dbClient = new DBClient;

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const repeatFct = async () => {
            await setTimeout(() => {
                i += 1;
                if (i >= 10) {
                    reject()
                }
                else if(!dbClient.isAlive()) {
                    repeatFct()
                }
                else {
                    resolve()
                }
            }, 1000);
        };
        repeatFct();
    })
};

(async () => {
    console.log(dbClient.isAlive());
    await waitConnection();
    console.log(dbClient.isAlive());
    console.log(await dbClient.nbUsers());
    console.log(await dbClient.nbFiles());
})();

//const dbClient = new DBClient;
module.exports = dbClient;
