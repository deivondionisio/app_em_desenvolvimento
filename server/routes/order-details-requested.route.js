// Detalhes do Pedido
const express = require('express');
const router = express.Router();

// Rota para renderizar a página de detalhes do pedido
router.get('/action-panel/requested-order-approver/order-details-requested/:idPedido', function(req, res) {
    // Aqui você irá buscar os detalhes do pedido com base no ID do pedido fornecido na URL
    const idPedido = req.params.idPedido;

    // Simulando dados do pedido (substitua com os dados reais do seu banco de dados)
    const pedido = {
        funcionario: 'Funcionário 1',
        dataPedido: '2024-02-24',
        itens: [
            { nome: 'Material 1', quantidade: 2, observacao: 'Observação 1' },
            { nome: 'Material 2', quantidade: 1, observacao: 'Observação 2' }
            // Adicione mais itens conforme necessário
        ]
    };

    // Renderizar a página de detalhes do pedido e passar os dados do pedido para a view
    res.render('order-details-requested', { pedido: pedido });
});

module.exports = router;
