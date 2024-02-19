const Sequelize = require('sequelize');
const DataTypes = require('sequelize').DataTypes;

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const Material = sequelize.define('Material', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  unidade_medida: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantidade_estoque: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  valor_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  data_cadastro: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  observacao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Material',
  freezeTableName: true,
  timestamps: false
});

module.exports = Material;
