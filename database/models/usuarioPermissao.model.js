const { sequelize, Sequelize } = require('../../config/db');


const UsuarioPermissao = sequelize.define('usuario_permissao', {
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
  permissao_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'permissoes', 
      key: 'id',
    }
  }
}, {
  timestamps: false,
  tableName: 'usuarios_permissoes'
});

module.exports = UsuarioPermissao;
