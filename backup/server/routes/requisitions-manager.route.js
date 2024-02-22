const express = require('express');
const router = express.Router();

router.get('/menu/requisitions-manage', (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/platform/requisition-manager.html'));
});

module.exports = router;
