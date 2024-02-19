const Sequelize = require('sequelize');
const config = require('./config/database')[process.env.NODE_ENV || 'development'];

// Cria a instância do Sequelize com a configuração de banco de dados.
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  // Adicione outras configurações conforme necessário, como pool de conexões, timezone, etc.
});

// Objeto para reunir os modelos e a instância do Sequelize.
const db = {};

// Importa e inicializa os modelos com a instância do Sequelize.
db.Usuario = require('./database/models/usuario.model')(sequelize);
db.Requisicao = require('./database/models/requisicao.model')(sequelize);
db.Material = require('./database/models/material.model')(sequelize);
db.MaterialRequisicao = require('./database/models/materialRequisicao.model')(sequelize);
db.Permissao = require('./database/models/permissao.model')(sequelize);
db.UsuarioPermissao = require('./database/models/usuarioPermissao.model')(sequelize);

// Configura as associações entre os modelos.
// Aqui, você define as relações como um para muitos, muitos para um, etc.
db.Usuario.hasMany(db.Requisicao, { foreignKey: 'usuario_id' });
db.Requisicao.belongsTo(db.Usuario, { foreignKey: 'usuario_id' });

// Configuração de uma relação de muitos para muitos através de uma tabela de junção.
db.Usuario.belongsToMany(db.Permissao, { through: db.UsuarioPermissao, foreignKey: 'usuario_id', otherKey: 'permissao_id' });
db.Permissao.belongsToMany(db.Usuario, { through: db.UsuarioPermissao, foreignKey: 'permissao_id', otherKey: 'usuario_id' });

// Relação entre Material e MaterialRequisicao (se aplicável).
db.Material.hasMany(db.MaterialRequisicao, { foreignKey: 'material_id' });
db.MaterialRequisicao.belongsTo(db.Material, { foreignKey: 'material_id' });

// Relação entre Requisicao e MaterialRequisicao (se aplicável).
db.Requisicao.hasMany(db.MaterialRequisicao, { foreignKey: 'requisicao_id' });
db.MaterialRequisicao.belongsTo(db.Requisicao, { foreignKey: 'requisicao_id' });

// Adiciona a instância do Sequelize e a classe Sequelize ao objeto db.
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exporta o objeto db com todos os modelos e a instância do Sequelize.
module.exports = db;

// Sincroniza todos os modelos com o banco de dados, criando as tabelas se não existirem.
// Remova este código se você não quiser que seu aplicativo crie automaticamente tabelas.
sequelize.sync({ force: false }).then(() => {
  console.log('Tabelas sincronizadas');
});

// Aqui você pode iniciar seu servidor web, configurar middlewares, rotas, etc.
