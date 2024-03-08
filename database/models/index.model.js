const { sequelize, Sequelize } = require('../../config/db');

const Usuario = require('./usuario.model');
const Requisicao = require('./requisicao.model');
const UsuarioPermissao = require('./usuarioPermissao.model');
const Permissao = require('./permissao.model');

// Relacionamentos
Usuario.hasMany(Requisicao, { foreignKey: 'usuario_id' });
Requisicao.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Usuario.belongsToMany(Permissao, { through: UsuarioPermissao, foreignKey: 'usuario_id' });
Permissao.belongsToMany(Usuario, { through: UsuarioPermissao, foreignKey: 'permissao_id' });

module.exports = {
  Usuario,
  Requisicao,
  UsuarioPermissao,
  Permissao
};