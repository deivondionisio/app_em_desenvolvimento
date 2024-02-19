'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('./config/database');

const db = {};

let sequelize;
let success = false;

(async () => {
  while (!success) {
    try {
      console.log(config);
      if (config.use_env_variable) {
        sequelize = new Sequelize(process.env[config.use_env_variable], config);
      } else {
        sequelize = new Sequelize(config.database, config.username, config.password, {
          host: config.host,
          dialect: 'postgres',
          // ... other options
        });
      }

      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      success = true;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
})();

// Importação e inicialização das models
const UsuarioModel = require('./models/user.model');
const RequisicaoModel = require('./models/requisicao.model'); // Certifique-se de ajustar o nome do modelo conforme necessário
const MaterialModel = require('./models/materiais.model');
const MaterialRequisicaoModel = require('./models/materiaisrequisicao.model');
const PermissaoModel = require('./models/permissao.model');

const Usuario = UsuarioModel.init(sequelize, Sequelize.DataTypes);
const Requisicao = RequisicaoModel.init(sequelize, Sequelize.DataTypes);
const Material = MaterialModel.init(sequelize, Sequelize.DataTypes);
const MaterialRequisicao = MaterialRequisicaoModel.init(sequelize, Sequelize.DataTypes);
const Permissao = PermissaoModel.init(sequelize, Sequelize.DataTypes);

// Associações e outros relacionamentos...

// Exportação do objeto db
db.Usuario = Usuario;
db.Requisicao = Requisicao;
db.Material = Material;
db.MaterialRequisicao = MaterialRequisicao;
db.Permissao = Permissao;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
