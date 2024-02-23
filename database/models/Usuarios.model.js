const express = require("express")
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const router = express.Router()
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect:'postgres'
});

const { DataTypes } = require('sequelize');

const Usuarios = sequelize.define('usuarios', {
    id: {
        type: DataTypes.NUMERIC(9,0),
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unidade: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});


module.exports = Usuarios


