const express = require('express');
const router = express.Router();
const passport = require('passport');

// Rota para exibir o formulário de login
router.get('/', function(req, res) {
    res.render('usuarios/login');
});


// Login Handle
router.post('/autenticate', (req, res, next) => { 
    passport.authenticate('local', {
        successRedirect: '/action-panel',
        failureRedirect: '/nao-passou',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Você saiu');
    res.redirect('/exit-logout');
});

module.exports = router;
