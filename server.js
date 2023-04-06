const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const connect = require('./db');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3001;

// Serve static files
app.use(express.json());
app.use(express.static(__dirname));

// Session configuration
app.use(
  session({
    secret: 'Greendrive', // replace this with your own secret key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://Greendrive2023:Greendrive123@cluster0.poflabt.mongodb.net/Greendrive_db?retryWrites=true&w=majority' }),
    cookie: { maxAge: 86400000 },
  })
);

app.post('/register', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    const db = await connect();
    const userModel = new User(db);

    const existingUser = await userModel.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      userType,
    };

    const createdUser = await userModel.createUser(newUser);
    delete createdUser.password;

    const token = jwt.sign({ id: createdUser._id }, 'jwt_secret', {
      expiresIn: '1d',
    });

    req.session.token = token;
    res.status(201).json(createdUser);
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).json({ message: 'An error occurred during registration.' });
  }
});

// Catch-all route to serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
