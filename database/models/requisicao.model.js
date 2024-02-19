const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: 'postgres',
});

class RequisicaoModel extends Sequelize.Model {}

RequisicaoModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuario',
      key: 'id'
    }
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantidade_disponivel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fabricante: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_requisicao: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  observacao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Requisicao',
  freezeTableName: true,
  timestamps: false
});

module.exports = RequisicaoModel;

