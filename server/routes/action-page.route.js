const express = require('express');
const router = express.Router();

// Rota para lidar com o envio do formulário de login
router.post('/action-panel', function(req, res){
    // Lógica para autenticar o usuário
    // Aqui você pode verificar as credenciais do usuário e redirecioná-lo para a página adequada
    res.redirect('/action-panel');
});

// Rota para a página de ação
router.get('/action-panel', function(req, res){
    res.render('action-panel');
});

// Exportar o router
module.exports = router;