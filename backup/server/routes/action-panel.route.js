const express = require('express');
const router = express.Router();

router.get('/menu', (req, res) => {
  // Verifique se o usuário está autenticado
  res.sendFile(path.join(__dirname, '/action-panel.html'));
});

module.exports = router;
