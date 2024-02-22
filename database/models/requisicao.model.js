// Importe o pool de conexão com o banco de dados
const pool = require('../../config/db');

// Definição da classe Requisicao.
class Requisicao {
  static async findAll() {
    const query = 'SELECT * FROM requisicoes';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM requisicoes WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

// Exporte a classe Requisicao
module.exports = Requisicao;
