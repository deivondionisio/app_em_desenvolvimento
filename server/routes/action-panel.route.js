const express = require('express');
const router = express.Router();

// Rota para lidar com o envio do formulário de login
router.post('/autenticado', function(req, res){
    //verificar as credenciais do usuário e redirecioná-lo para a página adequada
res.redirect('/action-panel');
});

// Rota para a página de ação
router.get('/action-panel', function(req, res){
    res.render('action-panel');
});

// Exportar o router
module.exports = router;