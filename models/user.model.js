const Sequelize = require('sequelize');
const { development } = require('../config/database'); 

const sequelize = new Sequelize(development.database, development.username, development.password, {
  host: development.host,
  dialect: development.dialect,
  // ... outros parâmetros de configuração, se necessário
});

const Usuario = sequelize.define('Usuario', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  },
  unidade: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Usuario',
  freezeTableName: true,
  timestamps: false
});

module.exports = Usuario;
