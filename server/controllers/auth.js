const express = require('express');
const app = express();
const crypto = require("crypto");
const SECRET = crypto.randomBytes(64).toString("hex");
const jwt = require("jsonwebtoken");

// Importa o modelo de usuários
const usuarios = require('../../models/user.model');

// Define a rota para /api/login usando o método POST
app.post('/api/login', async (req, res, next) => {
  try {
    const { username, senha } = req.body; // Alterado de email para username

    const usuario = await usuarios.findOne({ where: { nome: username }, include: 'usuarios_permissoes'}); // Alterado de email para nome

    if (usuario) {
      const isSame = await require('bcrypt').compare(senha, usuario.senha);
      if (isSame) {
        var token = jwt.sign({ usuario }, SECRET, {
          expiresIn: 60 * 60 * 24 // expires in 24h
        });
        return res.status(200).send({ 
          auth: true, 
          token: token, 
          usuario: {
            id: usuario.id,
            nome: usuario.nome,
            unidade: usuario.unidade,
            createdAt: usuario.createdAt,
            updatedAt: usuario.updatedAt
          }, 
          message: null 
        });
      } else {
        return res.status(200).send({ auth: false, token: null, usuario: null, message: 'Senha incorreta!' });
      }
    } else {
      return res.status(200).send({ auth: false, token: null, usuario: null, message: 'Usuário não registrado!' });
    }
  } catch (error) {
    console.log('erro ao entrar', error);
    return res.status(500).json(error);
  }
});

// Inicia o servidor
app.listen(3000);
