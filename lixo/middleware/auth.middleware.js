const jwt = require('jsonwebtoken');
const blacklist = new Set();
 
// Middleware para verificar token JWT e autorizar login de usuário
const auth = (req, res, next) => {
  // Extrair token JWT do cabeçalho da requisição
  const token = req.headers['authorization'];
 
  // Se o token não for fornecido, retornar erro 401
  if (!token) {
    return res.status(401).json({
      message: 'Token não fornecido.'
    });
  }
 
  // Verificar token JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // Se o token for inválido ou estiver na lista negra, retornar erro 401
    if (err || blacklist.has(token)) {
      return res.status(401).json({
        message: 'Token inválido ou expirado.'
      });
    }
 
    // Se o token for válido, anexar informações do usuário à requisição
req.userId = decoded.id;
    next();
  });
};
 
//

// Exemplo de rota que usa o middleware `auth` para proteger o acesso
app.get('/api/users', auth, async (req, res) => {
    // Obter lista de usuários do banco de dados
    const users = await User.find();
   
    // Retornar lista de usuários
    res.json(users);
  });

//


// Middleware para adicionar token JWT à lista negra quando o usuário sair da seção
app.get('/logout', (req, res) => {
  // Extrair token JWT do cabeçalho da requisição
  const token = req.headers['authorization'];
 
  // Adicionar token à lista negra
  blacklist.add(token);
 
  // Redirecionar o usuário para a página de login
  res.redirect('/login');
});