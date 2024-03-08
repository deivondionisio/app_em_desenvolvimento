const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const Usuario = require('../database/models/Usuarios.model');
module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, senha, done) => {
            // Match user
            Usuario.findOne({ where: { email: email } })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Este email não está registrado' });
                    }

                    // Match password
                    bcrypt.compare(senha, user.senha, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Senha incorreta' });
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        Usuario.findByPk(id, (err, user) => {
            done(err, user);
        });
    });
};
