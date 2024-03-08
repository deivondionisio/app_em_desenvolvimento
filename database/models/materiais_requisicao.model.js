const { sequelize, Sequelize } = require('../../config/db');

const MaterialRequisicao = sequelize.define('materialRequisicao', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  requisicao_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'requisicoes',
      key: 'id',
    }
  },
  material_id: {
    type: Sequelize.STRING(50),
    references: {
      model: 'materiais',
      key: 'id',
    }
  },
  quantidade_requisitada: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING(50),
    defaultValue: 'pendente'
  }
}, {
  timestamps: false,
  tableName: 'materiais_requisicao'
});

module.exports = MaterialRequisicao;
