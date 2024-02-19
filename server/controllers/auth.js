require('dotenv').config(); // Assegure-se de ter o pacote 'dotenv' instalado
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../../database/models/user.model'); // Caminho relativo ao diretório atual
const UsuarioPermissoes = require('../../database/models/usuarioPermissoes.model'); // Exemplo de caminho para o modelo de permissões

const app = express();
app.use(express.json());

// Utilize uma variável de ambiente para a SECRET
const SECRET = process.env.JWT_SECRET;

app.post('/api/login', async (req, res) => {
  try {
    const { nome, senha } = req.body; // Utilizando 'nome' como identificador para login

    const usuario = await Usuario.findOne({
      where: { nome: nome },
      include: [{
        model: UsuarioPermissoes,
        as: 'permissoes' // 'as' deve corresponder ao definido no modelo Sequelize
      }]
    });

    if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
      const permissoes = usuario.permissoes.map(p => p.nome_permissao); // Supondo que 'nome_permissao' é o campo de permissões

      // Verifica se o usuário tem a permissão de administrador
      if (!permissoes.includes('administrador')) {
        return res.status(403).send({ auth: false, message: 'Acesso negado.' });
      }

      const token = jwt.sign({ id: usuario.id, permissoes }, SECRET, {
        expiresIn: 86400 // 24 horas
      });

      return res.status(200).send({ auth: true, token, usuario: { ...usuario.toJSON(), senha: undefined } }); // Não inclua a senha na resposta
    }

    res.status(401).send({ auth: false, message: 'Nome ou senha incorretos!' });
  } catch (error) {
    console.error('Erro ao entrar', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Outras rotas e middlewares...

// Inicia o servidor na porta definida no .env ou na porta 3000 por padrão
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
