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
    // Cria a instância do Sequelize com a configuração do banco de dados.
    sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: config.dialect,
      // ... outras opções de configuração do Sequelize ...
    });

    // Tenta autenticar com o banco de dados.
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Importa e inicializa os modelos com a instância do Sequelize.
    db.Usuario = require('./database/models/user.model')(sequelize);
    db.Requisicao = require('./database/models/requisicao.model')(sequelize);
    db.Material = require('./database/models/materiais.model')(sequelize);
    db.MaterialRequisicao = require('./database/models/materiaisrequisicao.model')(sequelize);
    db.Permissao = require('./database/models/permissao.model')(sequelize);
    db.UsuarioPermissao = require('./database/models/usuarios_permissoes.model')(sequelize);
 
    // Configura as associações entre os modelos conforme as relações do seu banco de dados.
    db.Usuario.hasMany(db.Requisicao, { foreignKey: 'usuario_id' });
    db.Requisicao.belongsTo(db.Usuario, { foreignKey: 'usuario_id' });

    db.Material.hasMany(db.MaterialRequisicao, { foreignKey: 'material_id' });
    db.MaterialRequisicao.belongsTo(db.Material, { foreignKey: 'material_id' });

    db.Requisicao.hasMany(db.MaterialRequisicao, { foreignKey: 'requisicao_id' });
    db.MaterialRequisicao.belongsTo(db.Requisicao, { foreignKey: 'requisicao_id' });

    db.Usuario.belongsToMany(db.Permissao, { through: db.UsuarioPermissao, foreignKey: 'usuario_id', otherKey: 'permissao_id' });
    db.Permissao.belongsToMany(db.Usuario, { through: db.UsuarioPermissao, foreignKey: 'permissao_id', otherKey: 'usuario_id' });

    // Adiciona a instância do Sequelize e a classe Sequelize ao objeto db.
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Exporta o objeto db com todos os modelos e a instância do Sequelize.
module.exports = db;

// Caso houver a necessidade de sincronizar os modelos com o banco de dados (criar tabelas automaticamente),
// você pode descomentar o seguinte código. Cuidado ao usar isso em produção.
/*
sequelize.sync({ force: false }).then(() => {
  console.log('Tabelas sincronizadas com sucesso.');
});
*/
