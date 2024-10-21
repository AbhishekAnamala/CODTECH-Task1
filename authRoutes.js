const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Dummy database (for example only, in real apps use an actual DB)
const users = [];

// Register user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  users.push({ email, password: hashedPassword });
  req.session.user = { email }; // Store user email in session
  res.send({ message: 'User registered successfully', user: { email } });
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = { email }; // Store user email in session
    res.send({ message: 'Login successful', user: { email } });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});

// Logout user
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: 'Logout failed' });
    }
    res.send({ message: 'Logout successful' });
  });
});

// Route to check if the user is authenticated
router.get('/profile', (req, res) => {
  if (req.session.user) {
    res.send({ message: 'Authenticated user', user: req.session.user });
  } else {
    res.status(401).send({ message: 'Not authenticated' });
  }
});

module.exports = router;
