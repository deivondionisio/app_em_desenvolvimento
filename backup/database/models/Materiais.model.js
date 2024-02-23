const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect:'postgres'
});

const { DataTypes } = require('sequelize');

const Materiais = sequelize.define('materiais', {
    id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade_disponivel: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT
    },
    fabricante: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

module.exports = Materiais
