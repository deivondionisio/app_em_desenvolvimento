const express = require('express');
const router = express.Router();

router.get('/menu/requisitions-approve', (req, res) => {
  // Verifique se o usuário é Técnico, Admin ou Sadmin
  res.sendFile(path.join(__dirname, '../../views/platform/request-to-approve.html'));
});

module.exports = router;
