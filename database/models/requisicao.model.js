const { Model, DataTypes } = require('sequelize');

// Definição da classe Requisicao que estende Model.
class Requisicao extends Model {}

// Exportação de uma função que aceita a instância do Sequelize e define o modelo.
module.exports = (sequelize) => {
  // Inicialização do modelo com os campos e opções.
  Requisicao.init({
    // Definição dos campos com os tipos e regras.
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Referência à tabela 'usuarios' para chave estrangeira.
      references: {
        model: 'usuarios', // nome da tabela de usuários como está no banco de dados
        key: 'id'
      }
    },
    // Campos adicionais definidos conforme o seu diagrama ER.
    tipo: {
      type: DataTypes.STRING(255), // Ajustado para corresponder ao diagrama ER
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(255), // Ajustado para corresponder ao diagrama ER
      allowNull: false
    },
    quantidade_disponivel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fabricante: {
      type: DataTypes.STRING(255), // Ajustado para corresponder ao diagrama ER
      allowNull: false
    },
    data_requisicao: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255), // Ajustado para corresponder ao diagrama ER
      allowNull: false
    },
    observacao: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize, // Passando a instância do Sequelize.
    modelName: 'Requisicao', // Nome do modelo em formato de PascalCase.
    freezeTableName: true, // Impede que o Sequelize pluralize o nome da tabela.
    timestamps: false // Indica que não estamos usando os campos 'createdAt' e 'updatedAt'.
  });

  // Retorna o modelo definido.
  return Requisicao;
};
