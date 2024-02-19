// Importando o Sequelize e os tipos de dados
const { Sequelize, Model, DataTypes } = require('sequelize');

// Criando uma instância do Sequelize com as configurações do banco de dados
const sequelize = new Sequelize('postgres://smadmin:smadmin2023@10.1.18.85:5432/RequisicaoEPI_DB');

class Requisicoes extends Model {}

Requisicoes.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    defaultValue: sequelize.literal('nextval(requisicoes_id_seq::regclass)')
  },
  usuario_id: {
    type: DataTypes.NUMERIC(9,0),
    allowNull: false
  },
  usuario_solicitante_id: {
   type: DataTypes.CHAR(255),
   allowNull:false
  },

}, {
 tableName:'requisicoes',
 sequelize,
});

module.exports = Requisicoes;