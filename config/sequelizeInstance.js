require('dotenv').config();
const Sequelize = require('sequelize');
const config = require('./database')[process.env.NODE_ENV || 'development']; 

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres',
    port: config.port || 5432,
    logging: console.log, // Ativar o log de todas as consultas SQL
  });
  

module.exports = sequelize;
