const mongoose = require('mongoose');

async function connect() {
  const connectionString = 'mongodb+srv://Greendrive2023:Greendrive123@cluster0.poflabt.mongodb.net/Greendrive_db?retryWrites=true&w=majority';

  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Connected to database');
  return mongoose.connection;
}

module.exports = connect;
