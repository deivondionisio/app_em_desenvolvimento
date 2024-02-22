// Lista de Pedidos para Aprovação
const express = require('express');
const router = express.Router();

// Rota para renderizar a página de lista de pedidos para aprovação
router.get('/action-panel/requested-order-approver', function(req, res) {
    // Simulando dados dos pedidos (substitua com os dados reais do seu banco de dados)
    const pedidos = [
        { funcionario: 'Funcionário 1', dataPedido: '2024-02-24' },
        { funcionario: 'Funcionário 2', dataPedido: '2024-02-25' },
        { funcionario: 'Funcionário 3', dataPedido: '2024-02-26' }
        // Adicione mais pedidos conforme necessário
    ];

    // Renderizar a página de lista de pedidos para aprovação e passar os dados dos pedidos para a view
    res.render('requested-order-approver', { pedidos: pedidos });
});

module.exports = router;
