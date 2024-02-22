const express = require('express');
const router = express.Router();

router.get('/menu/users-manage', (req, res) => {
  // Verifique se o usuário é Admin ou Sadmin
  res.sendFile(path.join(__dirname, '../../views/platform/manage-users.html'));
});

module.exports = router;
