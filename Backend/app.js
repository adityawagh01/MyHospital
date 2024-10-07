const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const users = []; // Array to hold user data
const JWT_SECRET = 'your_jwt_secret';

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
}));
app.use(express.json());

// Sign-up route
app.post('/api/auth/signup', async (req, res) => {
  const { username, password, userType } = req.body;

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword, userType });
  res.status(201).json({ message: 'User registered successfully' });
});

// Existing login route
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username: user.username, userType: user.userType }, JWT_SECRET, { expiresIn: '1h' });
  return res.json({ token });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
