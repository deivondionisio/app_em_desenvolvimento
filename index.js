//teste sequelize

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/database')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: process.env.DB_PORT || 5432, // Adicionando a porta que pode ser definida no arquivo .env
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;
