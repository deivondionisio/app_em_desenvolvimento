const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Usuarios = require('../database/models/Usuarios.model'); // Ajuste o caminho conforme necessário
const router = express.Router();
const localStrategy = require("passport-local").Strategy;

// Configuração da estratégia local do Passport
passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
    Usuarios.findOne({email: email}).then((usuario) => {
        if (!usuario) {
            return done(null, false, {message: "Esta conta não existe"});
        }
        bcrypt.compare(senha, usuario.senha, (error, batem) => {
            if (batem) {
                return done(null, usuario);
            } else {
                return done(null, false, {message: "Usuário ou senha incorreta"});
            }
        });
    });
}));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser((id, done) => {
    Usuarios.findById(id, (error, usuario) => {
        done(error, usuario);
    });
});

// Rota para exibir o formulário de login
router.get('/login', (req, res) => {
    res.render('usuarios/login');
});

// Rota POST para processar o login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/action-panel', // Redireciona para a rota '/action-panel' após login bem-sucedido
        failureRedirect: '/login', // Permanece na rota de login se houver falha
        failureFlash: true // Habilita mensagens flash para falhas de login
    })(req, res, next);
});

// Rota para logout
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success_msg', 'Deslogado com sucesso!');
        res.redirect('/login'); // Redireciona para a página de login após o logout
    });
});

module.exports = router;
