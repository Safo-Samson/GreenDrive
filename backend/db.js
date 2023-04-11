const { MongoClient } = require('mongodb');

async function connect() {
  const client = new MongoClient('mongodb+srv://Greendrive2023:Greendrive123@cluster0.poflabt.mongodb.net/Greendrive_db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  console.log('Connected to database');

  const db = client.db('Greendrive_db');
  return db;
}

module.exports = connect;
