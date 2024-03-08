const { sequelize, Sequelize } = require('../../config/db');


const Usuario = sequelize.define('usuario', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  senha: {
    type: Sequelize.STRING
  },
  unidade: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false,
  tableName: 'usuarios'
});

module.exports = Usuario;
