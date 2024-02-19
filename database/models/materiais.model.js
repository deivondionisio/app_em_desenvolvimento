const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Requisicao extends Model {}

Requisicao.init({
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

module.exports = Requisicao;
