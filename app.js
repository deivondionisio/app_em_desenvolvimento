const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const Sequelize = require('sequelize');
require('dotenv').config();
const { engine } = require('express-handlebars');
const path = require("path");

const app = express();
const port = process.env.PORT || 8080; // Usando uma porta padrão se APP_PORT não estiver definido

// Configuração para aceitar dados de formulário
app.use(express.urlencoded({ extended: true }));

// Configuração do diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, 'views', 'assets')));

// Configuração da sessão
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Inicialize o connect-flash
app.use(flash());

// Middleware para disponibilizar as mensagens flash nas respostas
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error'); // O Passport armazena mensagens de erro em 'error'
  next();
});

// Configuração do Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false, 
});

// Configuração do Handlebars
app.engine('handlebars', engine({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Testar a conexão com o banco de dados
sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
}).catch(err => {
    console.error('Erro ao conectar-se ao banco de dados:', err);
});

// Inicializar configuração do Passport e sessão do Passport
require("./server/controllers/auth")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Importar e usar rotas
const loginRouter = require('./server/routes/login.route');
const actionPageRouter = require('./server/routes/action-panel.route');
const requestMaterialsRouter = require('./server/routes/request-materials.route');
const ordersInProgressRouter = require('./server/routes/orders-in-progress.route'); 
//const requesOrderApprover = require('./server/routes/requested-order-approver.route')
//const orderDetailsRequested = require('./server/routes/order-details-requested.route')

app.use(loginRouter);
app.use(actionPageRouter);
app.use(requestMaterialsRouter);
app.use(ordersInProgressRouter); 
//app.use(requesOrderApprover);
//app.use(orderDetailsRequested);

// Inicie o servidor
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
