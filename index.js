const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('./config/database')[env];

const db = {};

let sequelize;

(async () => {
  try {
    console.log(config);
    sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: config.dialect,
      // ... other options
    });

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Importe todas as models
    const UsuarioModel = require('./database/models/user.model');
    const RequisicaoModel = require('./database/models/requisicao.model');
    const MaterialModel = require('./database/models/materiais.model');
    const MaterialRequisicaoModel = require('./database/models/materiaisrequisicao.model');
    const PermissaoModel = require('./database/models/permissao.model');
    const UsuarioPermissaoModel = require('./database/models/usuarios_permissoes.model');

    // Inicialize as models com sequelize
    const Usuario = UsuarioModel.init(sequelize, Sequelize.DataTypes);
    const Requisicao = RequisicaoModel.init(sequelize, Sequelize.DataTypes);
    const Material = MaterialModel.init(sequelize, Sequelize.DataTypes);
    const MaterialRequisicao = MaterialRequisicaoModel.init(sequelize, Sequelize.DataTypes);
    const Permissao = PermissaoModel.init(sequelize, Sequelize.DataTypes);
    const UsuarioPermissao = UsuarioPermissaoModel.init(sequelize, Sequelize.DataTypes);

    // Configure as associações entre as models
    Usuario.hasMany(Requisicao, { foreignKey: 'usuario_id' });
    Requisicao.belongsTo(Usuario, { foreignKey: 'usuario_id' });

    Material.hasMany(MaterialRequisicao, { foreignKey: 'material_id' });
    MaterialRequisicao.belongsTo(Material, { foreignKey: 'material_id' });

    Requisicao.hasMany(MaterialRequisicao, { foreignKey: 'requisicao_id' });
    MaterialRequisicao.belongsTo(Requisicao, { foreignKey: 'requisicao_id' });

    Usuario.belongsToMany(Permissao, { through: UsuarioPermissao, foreignKey: 'usuario_id', otherKey: 'permissao_id' });
    Permissao.belongsToMany(Usuario, { through: UsuarioPermissao, foreignKey: 'permissao_id', otherKey: 'usuario_id' });

    // Adicione as models ao objeto db
    db.Usuario = Usuario;
    db.Requisicao = Requisicao;
    db.Material = Material;
    db.MaterialRequisicao = MaterialRequisicao;
    db.Permissao = Permissao;
    db.UsuarioPermissao = UsuarioPermissao;

    // Adicione o sequelize ao objeto db
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Exporte o objeto db
module.exports = db;
