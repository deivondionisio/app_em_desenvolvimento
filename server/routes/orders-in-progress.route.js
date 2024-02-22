const express = require('express');
const router = express.Router();
const pool = require('../../config/db');

// Importe a model Requisicao definida em requisicao.model.js
const Requisicao = require('../../database/models/requisicao.model');

// Rota para pedidos em andamento
router.get('/action-panel/order-in-progress', async function(req, res) {
    try {
        // Buscar todas as requisições
        const requisicoes = await Requisicao.findAll();
        res.render('order-in-progress', { requisicoes: requisicoes });
    } catch (error) {
        console.error('Erro ao buscar as requisições:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

module.exports = router;
