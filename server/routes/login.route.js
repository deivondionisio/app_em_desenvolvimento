// login.route.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

// Rota para exibir o formulário de login
router.get('/', function(req, res) {
    res.render('pages/index');
});


// rota de autenticação do login

router.post("/login", (req, res, next) => {
    passport.authenticate("local", { 
        successRedirect: "/",
        failureRedirect: "/pages/index",
        failureFlash: true
    })(req, res, next);
});
module.exports = router;
