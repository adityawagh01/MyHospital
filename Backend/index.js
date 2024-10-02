const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import CORS

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Hardcoded users
const users = [
  {
    username: 'user1',
    password: bcrypt.hashSync('password1', 10),
  },
  {
    username: 'user2',
    password: bcrypt.hashSync('password2', 10),
  }
];

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret';

// Login route
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

  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  return res.json({ token });
});

// Protected route example
app.get('/api/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ message: 'Welcome to the protected route!', user: decoded });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// // server.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const app = express();

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Hardcoded users (in place of a database)
// const users = [
//   {
//     username: 'user1',
//     password: bcrypt.hashSync('password1', 10), // Password is hashed for security
//   },
//   {
//     username: 'user2',
//     password: bcrypt.hashSync('password2', 10),
//   }
// ];

// // Secret key for JWT
// const JWT_SECRET = 'your_jwt_secret';

// // Login route
// app.post('/api/auth/login', (req, res) => {
//   const { username, password } = req.body;

//   // Find user by username
//   const user = users.find(u => u.username === username);
//   if (!user) {
//     return res.status(400).json({ message: 'Invalid username or password' });
//   }

//   // Check password
//   const isMatch = bcrypt.compareSync(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ message: 'Invalid username or password' });
//   }

//   // Generate JWT token
//   const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

//   return res.json({ token });
// });

// // Protected route (example)
// app.get('/api/protected', (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     return res.json({ message: 'Welcome to the protected route!', user: decoded });
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
