const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://Greendrive2023:Greendrive123@cluster0.poflabt.mongodb.net/Greendrive_db?retryWrites=true&w=majority';

const connect = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

module.exports = connect;
