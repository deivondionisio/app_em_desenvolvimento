const { sequelize, Sequelize } = require('../../config/db');


const Permissao = sequelize.define('permissao', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_permissao: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'permissoes',
  schema: 'public'
});

module.exports = Permissao;
