const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


const connect = require('./db');
const User = require('./models/User');
const handleDVLARequest = require('./vehicle-enquiry') //adding the dvla to the server - SAFO

const app = express();
const port = process.env.PORT || 3001;

// Serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

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

// Passport.js configuration
app.use(passport.initialize());
app.use(passport.session());

const checkUserRole = (expectedRole) => {
  return (req, res, next) => {
    if (req.user && req.user.userType === expectedRole) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
};

// Example usage of the helper function in a route
app.get('/customer-only-route', checkUserRole('customer'), (req, res) => {
  // This route will be accessible only for users with userType 'customer'
  res.json({ message: 'This is an example route for customer users' });
});

app.get('/mechanic-only-route', checkUserRole('mechanic'), (req, res) => {
  // This route will be accessible only for users with userType 'mechanic'
  res.json({ message: 'This is an example route for mechanic users' });
});


// Example usage of the helper function in a route
app.get('/customer-only-route', checkUserRole('customer'), (req, res) => {
  // This route will be accessible only for users with userType 'customer'
  res.json({ message: 'This is an example route for customer users' });
});

app.get('/mechanic-only-route', checkUserRole('mechanic'), (req, res) => {
  // This route will be accessible only for users with userType 'mechanic'
  res.json({ message: 'This is an example route for mechanic users' });
});

// Add your customer and mechanic dashboard routes here
app.get(
  '/customer-dashboard',
  passport.authenticate('jwt', { session: false }),
  checkUserRole('customer'),
  (req, res) => {
    // Your customer dashboard logic here
  }
);

app.get(
  '/mechanic-dashboard',
  passport.authenticate('jwt', { session: false }),
  checkUserRole('mechanic'),
  (req, res) => {
    // Your mechanic dashboard logic here
  }
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

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await connect();
    const userModel = new User(db);

    const existingUser = await userModel.getUserByEmail(email);

    if (!existingUser) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: existingUser._id }, 'jwt_secret', {
      expiresIn: '1d',
    });

    console.log('Token:', token); //  logs the token in console for debugging purpose

    res.header('authorization', `Bearer ${token}`);

    req.session.token = token;
    res.status(200).json({ userId: existingUser._id });
  } catch (error) {
    console.error('Error in /api/login:', error);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
});

// Catch-all route to serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
