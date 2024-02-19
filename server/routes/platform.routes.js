const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

// Supondo que você tenha algum método para verificar o token JWT e autorizar o usuário
const authorizeUser = require('./authorizeUser');

app.get('/api/resource', async (req, res) => {
  const token = req.headers['x-access-token'];

  try {
    const user = jwt.verify(token, 'your-secret-key');

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const isAuthorized = await authorizeUser(user);

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Supondo que você tenha algum método para buscar os dados com base nas autoridades do usuário
    const data = await fetchDataBasedOnAuthorities(user.authorities);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
