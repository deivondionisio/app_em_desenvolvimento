// Importando o Sequelize e os tipos de dados
const { Sequelize, Model, DataTypes } = require('sequelize');

// Criando uma instância do Sequelize com as configurações do banco de dados
const sequelize = new Sequelize('postgres://smadmin:smadmin2023@10.1.18.85:5432/RequisicaoEPI_DB');

class MateriaisRequisicao extends Model {}

MateriaisRequisicao.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    requisicao_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    material_id: {
        type: DataTypes.CHAR(60),
        allowNull: false
    },
    quantidade_requisitada: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    status:{
      type :DataTypes.CHAR(5),
      allowNull:false 
   }
}, {
  sequelize, 
  modelName:'MateriaisRequisicao',
  tableName:'materiais_requisicao',
  timestamps:false 
});

module.exports = MateriaisRequisicao;