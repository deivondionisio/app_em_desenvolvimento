const { Model, DataTypes } = require('sequelize');

// Define a classe UsuarioPermissao que estende Model.
class UsuarioPermissao extends Model {}

// Exporta uma função que recebe a instância do Sequelize e define o modelo.
module.exports = (sequelize) => {
  UsuarioPermissao.init({
    // Geralmente não é necessário definir um ID para uma tabela de associação,
    // Sequelize vai cuidar disso se você estiver usando 'through' em uma relação N:M.
    // A menos que sua tabela de associação tenha campos adicionais, você pode omitir esta parte.
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios', // Deve corresponder ao nome da tabela no banco de dados
        key: 'id'
      }
    },
    permissao_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'permissoes', // Deve corresponder ao nome da tabela no banco de dados
        key: 'id'
      }
    }
    // Se houver mais campos na tabela de associação, eles devem ser adicionados aqui.
  }, {
    sequelize, // Passa a instância do Sequelize.
    modelName: 'UsuarioPermissao', // O nome do modelo em formato PascalCase.
    tableName: 'usuarios_permissoes', // O nome real da tabela no banco de dados.
    timestamps: false // Indica que não estamos usando os campos 'createdAt' e 'updatedAt'.
  });

  // Retorna o modelo definido.
  return UsuarioPermissao;
};
