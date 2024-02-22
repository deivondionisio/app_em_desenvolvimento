const { Model, DataTypes } = require('sequelize');

// Define a classe Usuario que estende Model.
class Usuario extends Model {}

// Exporta uma função que recebe a instância do Sequelize e define o modelo.
module.exports = (sequelize) => {
  Usuario.init({
    // Define os campos do modelo com seus tipos de dados e regras.
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(255), // Ajustado para corresponder ao diagrama ER
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255), // Ajustado para corresponder ao diagrama ER
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING, // Não especifica o comprimento, 
      allowNull: false
    },
    unidade: {
      type: DataTypes.INTEGER, // Ajustado para corresponder ao tipo no diagrama ER
      allowNull: false
    }
  }, {
    sequelize, // Passa a instância do Sequelize.
    modelName: 'Usuario', // O nome do modelo em formato PascalCase.
    freezeTableName: true, // Impede que o Sequelize pluralize o nome da tabela.
    timestamps: false // Indica que não estamos usando os campos 'createdAt' e 'updatedAt'.
  });

  // Retorna o modelo definido.
  return Usuario;
};
