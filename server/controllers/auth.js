
module.exports = function(passport) {
  const LocalStrategy = require('passport-local').Strategy;
  const Usuario = require('../../database/models/usuario.model');

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
    },
    function(email, senha, done) {
      Usuario.findOne({ where: { email: email } }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Email não encontrado.' });
        }
        if (senha !== user.senha) {
          return done(null, false, { message: 'Senha incorreta.' });
        }
        return done(null, user);
      }).catch(err => done(err));
    }
  ));

  // Serializar o usuário para a sessão
  passport.serializeUser(function(user, done) {
    done(null, user.id); // Salva apenas o id do usuário na sessão
  });

  // Desserializar o usuário da sessão
  passport.deserializeUser(function(id, done) {
    Usuario.findByPk(id).then(user => {
      done(null, user); 
    }).catch(err => done(err));
  });
};
