const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// Importe os roteadores
const authRoutes = require('./views/platform/assets/routes/authRoutes');

// Crie a instância do aplicativo Express
const app = express();

// Aplicar middlewares globais
app.use(cors()); // Habilita CORS se necessário
app.use(express.json()); // Middleware para parsear JSON no body das requisições
app.use(express.urlencoded({ extended: true })); // Middleware para parsear corpos com codificação URL

// Configurar rota para servir arquivos estáticos
app.use('/assets', express.static(__dirname + '/views/platform/assets'));

// Defina as rotas da aplicação
app.use('/api', authRoutes); // Usa as rotas de autenticação

// Serve a página de login na rota raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'platform', 'index.html')); // ajuste para o arquivo HTML correto
});

// Middleware para lidar com erros não capturados
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

// Middleware para lidar com rotas não encontradas
app.use((req, res, next) => {
  res.status(404).send('Desculpe, não conseguimos encontrar isso!');
});

// Inicialize o servidor para ouvir em uma porta específica
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Exporte o app para permitir testes ou execução em outro lugar
module.exports = app;
