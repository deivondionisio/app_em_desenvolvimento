const { sequelize, Sequelize } = require('../../config/db');


const Requisicao = sequelize.define('requisicao', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios', 
      key: 'id',
    }
  },
  usuario_solicitante_id: {
    type: Sequelize.INTEGER
  },
  usuario_solicitante_nome: {
    type: Sequelize.STRING(255)
  },
  area_requisicao: {
    type: Sequelize.STRING(50)
  },
  data_requisicao: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.STRING(5)
  },
  observacao: {
    type: Sequelize.TEXT
  }
}, {
  timestamps: false,
  tableName: 'requisicoes'
});

module.exports = Requisicao;
