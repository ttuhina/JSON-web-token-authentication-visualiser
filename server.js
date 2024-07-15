const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;
const SECRET_KEY = 'your-secret-key';

let users = [];

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send('User registered');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Authentication failed');
    }
  });

  app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Access granted to protected route', user: req.user });
  });
  
  function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('No token provided');
    
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).send('Invalid token');
      req.user = decoded;
      next();
    });
  }

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));