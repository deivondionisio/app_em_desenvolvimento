const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: 'postgres',
});

class PermissaoModel extends Sequelize.Model {}

PermissaoModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Permissao',
  freezeTableName: true,
  timestamps: false
});

module.exports = PermissaoModel;
