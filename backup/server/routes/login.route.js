// login.route.js

const express = require('express');
const router = express.Router();

// Rota para exibir o formulário de login
router.get('/', function(req, res) {
    res.render('usuarios/login');
});

module.exports = router;