const { sequelize, Sequelize } = require('../../config/db');

const Material = sequelize.define('material', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true,
    allowNull: false
  },
  tipo: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  quantidade_disponivel: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT
  },
  fabricante: {
    type: Sequelize.STRING(255)
  }
}, {
  timestamps: false,
  tableName: 'materiais'
});

module.exports = Material;
