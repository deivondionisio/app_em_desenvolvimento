const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: 'postgres',
});

class MaterialRequisicaoModel extends Sequelize.Model {}

MaterialRequisicaoModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  requisicao_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Requisicao',
      key: 'id'
    }
  },
  material_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Material',
      key: 'id'
    }
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  valor_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  observacao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'MaterialRequisicao',
  freezeTableName: true,
  timestamps: false
});

module.exports = MaterialRequisicaoModel;

