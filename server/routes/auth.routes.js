const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

// Supondo que você tenha algum método para buscar o usuário e verificar a senha
const authenticateUser = require('./authenticateUser');

app.post('/api/auth/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authenticateUser(username, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = {
      username: user.username,
      authorities: user.authorities
    };

    const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '2h' });

    res.json({
      token,
      user_info: payload
    });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
