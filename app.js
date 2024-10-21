/**This code is for authentication by using expressjs,bcrypt,routes and some middleware**/

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: 'yourSecretKey', // Change this to a unique secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set true for HTTPS
}));

// Static folder for serving HTML and CSS
app.use(express.static('public'));

// Authentication routes
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
