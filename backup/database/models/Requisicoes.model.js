const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect:'postgres'
});

const { DataTypes } = require('sequelize');

const Requisicoes = sequelize.define('requisicoes', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'usuarios', // nome da tabela referenciada
            key: 'id'
        }
    },
    usuario_solicitante_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    usuario_solicitante_nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    usuario_solicitante_cdc: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    data_requisicao: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: 'pendente'
    },
    observacao: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: false,
    tableName: 'requisicoes'
});

module.exports = Requisicoes
