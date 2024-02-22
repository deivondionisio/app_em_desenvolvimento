const express = require('express');
const router = express.Router();

router.get('/menu/materials-requisition', (req, res) => {
  // Verifique se o usuário está autenticado
  res.sendFile(path.join(__dirname, '../../views/platform/materials-requisition.html'));
});

module.exports = router;
