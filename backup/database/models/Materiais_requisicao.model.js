const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect:'postgres'
});

const { DataTypes } = require('sequelize');

const MateriaisRequisicao = sequelize.define('materiais_requisicao', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    requisicao_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'requisicoes', // nome da tabela referenciada
            key: 'id'
        }
    },
    material_id: {
        type: DataTypes.STRING(50),
        references: {
            model: 'materiais', // nome da tabela referenciada
            key: 'id'
        }
    },
    quantidade_requisitada: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: 'pendente'
    }
}, {
    timestamps: false,
    tableName: 'materiais_requisicao'
});

module.exports = MateriaisRequisicao
