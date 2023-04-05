const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT || 3001;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Session configuration
app.use(
  session({
    secret: 'your_secret_key', // replace this with your own secret key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://Greendrive2023:Greendrive123@cluster0.poflabt.mongodb.net/your_database_name?retryWrites=true&w=majority' }),
    cookie: { maxAge: 86400000 },
  })
);

// Catch-all route to serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
