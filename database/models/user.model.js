// Importando o Sequelize e os tipos de dados
const { Sequelize, DataTypes } = require('sequelize');

// Criando uma instância do Sequelize com as configurações do banco de dados
const sequelize = new Sequelize('postgres://smadmin:smadmin2023@10.1.18.85:5432/RequisicaoEPI_DB');

// Definindo o modelo sequencial para a tabela "public.usuarios"
const Usuario = sequelize.define('Usuario', {
  // Atributos do modelo são definidos aqui
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  unidade: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize, // Precisamos passar a instância do Sequelize
  modelName: 'Usuario', // Precisamos escolher o nome do modelo
  freezeTableName: true, // Impede que o Sequelize pluralize o nome da tabela
  timestamps: false // Impede que o Sequelize crie os atributos createdAt e updatedAt
});

// `sequelize.define` também retorna o modelo
console.log(Usuario === sequelize.models.Usuario); // true