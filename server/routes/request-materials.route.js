// Importar o Express
const express = require('express');
// Criar uma instância do Router
const router = express.Router();

// Middleware para processar JSON e dados de formulário URL-encoded
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Rota para o formulário de solicitação de materiais
router.get('/action-panel/form-request-materials', function(req, res) {
    res.render('form-request-materials');
});

// Rota para receber os dados do formulário
router.post('/form-okay', function(req, res) {
    // O nome do usuário
    const nome = req.body.nome; // Ajuste para capturar o campo 'nome' do formulário

    // Garantir que os IDs dos materiais sejam sempre tratados como um array
    let material_ids = req.body['material_id[]'];
    if (!Array.isArray(material_ids)) {
        material_ids = material_ids ? [material_ids] : [];
    }

    // Enviar uma resposta
    const responseMessage = material_ids.length > 0
        ? "Nome: " + nome + " - IDs dos Materiais: " + material_ids.join(', ')
        : "Nome: " + nome + " - Nenhum material selecionado.";

    res.send(responseMessage);
});

// Exportar o router
module.exports = router;
