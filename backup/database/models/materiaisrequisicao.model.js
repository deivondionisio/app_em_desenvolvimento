const { Model, DataTypes } = require('sequelize');

// Define a classe MaterialRequisicao que estende Model.
class MaterialRequisicao extends Model {}

// Exporta uma função que recebe a instância do Sequelize e define o modelo.
module.exports = (sequelize) => {
  MaterialRequisicao.init({
    // Define os campos do modelo.
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    requisicao_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'requisicoes', // O nome da tabela de requisições no banco de dados.
        key: 'id'
      }
    },
    material_id: {
      type: DataTypes.STRING, // De acordo com o seu diagrama ER, este campo é uma string.
      allowNull: false,
      references: {
        model: 'materiais', // O nome da tabela de materiais no banco de dados.
        key: 'id'
      }
    },
    quantidade_requisitada: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(50), // Ajuste o tamanho conforme necessário.
      allowNull: false
    },
    // Outros campos podem ser adicionados aqui, se necessário.
  }, {
    sequelize, // Passa a instância do Sequelize.
    modelName: 'MaterialRequisicao', // O nome do modelo em formato PascalCase.
    freezeTableName: true, // Impede que o Sequelize pluralize o nome da tabela.
    timestamps: false // Indica que não estamos usando campos de timestamp.
  });

  // Retorna o modelo definido.
  return MaterialRequisicao;
};
