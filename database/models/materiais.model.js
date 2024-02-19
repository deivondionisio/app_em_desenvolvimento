const { Model, DataTypes } = require('sequelize');

class Material extends Model {}

module.exports = (sequelize) => {
  Material.init({
    // A chave primária 'id' não precisa ser definida, o Sequelize adiciona automaticamente
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios', // O nome da tabela deve estar em minúsculas
        key: 'id'
      }
    },
    tipo: {
      type: DataTypes.STRING(255), // Especificando o comprimento conforme o diagrama
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(255), // Especificando o comprimento conforme o diagrama
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
      type: DataTypes.STRING(255), // Especificando o comprimento conforme o diagrama
      allowNull: false
    },
    // A coluna 'data_requisicao' foi removida, pois ela não faz parte do modelo 'Material'
    // A coluna 'status' foi removida, pois ela não faz parte do modelo 'Material'
    observacao: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Material', // Nome do modelo em formato de PascalCase
    freezeTableName: true, // Impede que o Sequelize pluralize o nome da tabela
    timestamps: false // Indica que não estamos usando os campos 'createdAt' e 'updatedAt'
  });

  return Material;
};
