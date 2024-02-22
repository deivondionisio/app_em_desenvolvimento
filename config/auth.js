const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");
const sequelize = require('../config/sequelizeInstance'); 

// Modelo Sequelize
const Usuario = require('../database/models/user.model')(sequelize); 

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email'}, (email, senha, done) => {
        // Utilize o método findOne do Sequelize para recuperar o usuário
        Usuario.findOne({where: {email: email}}).then(usuario => {
            if (!usuario){
                return done(null, false, {message: "Essa conta não existe"});
            }

            // Comparar a senha com bcrypt
            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if(batem){
                    return done(null, usuario);
                }else{
                    return done(null, false, {message:"Senha incorreta"});
                }
            });
        }).catch(err => done(err));
    }));

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id);
    });

    passport.deserializeUser((id, done) => {
        // Utilize o método findByPk do Sequelize para recuperar o usuário pela chave primária
        Usuario.findByPk(id).then(usuario => {
            done(null, usuario);
        }).catch(err => done(err));
    });
};
