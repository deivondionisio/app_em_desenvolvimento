require('dotenv').config(); // Importa as variáveis de ambiente do arquivo .env

const { Pool } = require('pg');

// Configurações para conectar ao banco de dados
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;


/* Exemplo de SELECT
pool.query('SELECT * FROM materiais', (error, result) => {
  if (error) {
    console.error('Erro ao executar a consulta:', error);
  } else {
    console.log('Resultados da consulta:', result.rows);
  }

  // Fecha a conexão com o banco de dados
  pool.end();
});

*/