// Importar o Express e Sequelize
const express = require('express');
const { Op } = require('sequelize');

// Importar o modelo Material
const Material = require('../../database/models/materiais.model');

// Criar uma instância do Router
const router = express.Router();

// Middleware para processar JSON e dados de formulário URL-encoded
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Rota para o formulário de solicitação de materiais
router.get('/action-panel/form-request-materials', function(req, res) {
    res.render('form-request-materials');
});

// Rota para pesquisar por nome com busca insensível a maiúsculas e minúsculas
router.post('/api/search', async (req, res) => {
    const { searchTerm, searchType } = req.body;
    let condition = {};

    if (searchType === 'ID' && !isNaN(searchTerm)) {
        condition.id = searchTerm;
    } else if (searchType === 'NOME') {
        condition.nome = { [Op.iLike]: `%${searchTerm}%` };
    } else {
        return res.status(400).send("Tipo de pesquisa inválido.");
    }

    try {
        const results = await Material.findAll({
            attributes: ['id', 'nome', 'quantidade_disponivel'],
            where: condition
        });
        res.json(results);
    } catch (error) {
        console.error('Search Error:', error);
        res.status(500).send("Erro ao processar a busca");
    }
});

// Exportar o router
module.exports = router;
