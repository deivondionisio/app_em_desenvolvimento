const { Model, DataTypes } = require('sequelize');

// Definição da classe Permissao que estende Model.
class Permissao extends Model {}

// Exportação de uma função que aceita a instância do Sequelize e define o modelo.
module.exports = (sequelize) => {
  // Inicialização do modelo com os campos e opções.
  Permissao.init({
    // Definição dos campos com os tipos e regras.
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(50), // O tamanho do campo deve refletir o definido no seu banco de dados.
      allowNull: false,
      unique: true
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true // Se descrições podem ser nulas, conforme o seu modelo de dados.
    }
  }, {
    sequelize, // Passando a instância do Sequelize.
    modelName: 'Permissao', // Nome do modelo em formato de PascalCase.
    freezeTableName: true, // Impede que o Sequelize pluralize o nome da tabela.
    timestamps: false // Indica que não estamos usando os campos 'createdAt' e 'updatedAt'.
  });

  // Retorna o modelo definido.
  return Permissao;
};
