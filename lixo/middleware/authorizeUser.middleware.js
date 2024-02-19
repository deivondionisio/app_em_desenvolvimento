const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});


const authorizeUser = async (token) => {
  try {
    const payload = jwt.verify(token, 'your-secret-key');

    const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [payload.userId]);

    if (rows.length === 0) {
      throw new Error('User not found');
    }

    const user = rows[0];

    const { rows: permRows } = await pool.query('SELECT * FROM permissoes WHERE id = $1', [user.id]);

    const permissions = permRows.map(row => row.nome_permisso);

    return {
      ...user,
      permissions,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
