// Importações necessárias
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
const { engine } = require('express-handlebars');
const Sequelize = require('sequelize');
const path = require('path');

// Instância do Express
const app = express();

// Porta do servidor
const port = process.env.APP_PORT;

// Configuração do Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

// Testar a conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
  .catch(err => console.error('Erro ao conectar-se ao banco de dados:', err));

// Configuração do diretório de assets
app.use(express.static(path.join(__dirname, 'views')));

// Middleware para processar dados de formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração da sessão
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

// Configuração do flash
app.use(flash());

// Middleware para mensagens flash
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Configuração do Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Configuração do Passport para usar a estratégia local
require('./config/passport')(passport); 

// Rotas de autenticação
const authRoutes = require('./config/auth');
app.use('/auth', authRoutes);

// Importar rotas
//const loginRouter = require('./server/routes/login.route');
const authRouter = require('./config/auth');
const actionPageRouter = require('./server/routes/action-page.route');
const requestMaterialsRouter = require('./server/routes/request-materials.route');
const ordersInProgressRouter = require('./server/routes/orders-in-progress.route');
const requesOrderApprover = require('./server/routes/requested-order-approver.route')
const orderDetailsRequested = require('./server/routes/order-details-requested.route')

// Usar as rotas importadas
//app.use(loginRouter);
app.use(authRouter);
app.use(actionPageRouter);
app.use(requestMaterialsRouter);
app.use(ordersInProgressRouter);
app.use(requesOrderApprover);
app.use(orderDetailsRequested);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
