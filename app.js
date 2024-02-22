require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const Sequelize = require('sequelize'); 
const dbConfig = require('./config/database'); 
const app = express();
const port = process.env.APP_PORT || 8080;
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const passport = require("passport");
require("./config/auth")(passport);

// Configurar o Sequelize com as configurações importadas
const sequelize = new Sequelize(dbConfig[process.env.NODE_ENV || 'development']); 

//Views -> css and js <-
app.use(express.static(path.join(__dirname,"views")));

//Configurar Sessão
app.use(session({
  secret: process.env.JWT_SECRET, // Usa a chave secreta do .env para a sessão
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Middleware
app.use((req, res, next) => {
  console.log("Middleware de flash message");
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next(); 
});

// Configuração do Handlebars
app.engine('handlebars', engine({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware para processar dados de formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Testar a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao conectar-se ao banco de dados:', err);
  });

// Importar rotas
const loginRouter = require('./server/routes/login.route');
const actionPageRouter = require('./server/routes/action-page.route');
const requestMaterialsRouter = require('./server/routes/request-materials.route');
const ordersInProgressRouter = require('./server/routes/orders-in-progress.route'); 
const requesOrderApprover = require('./server/routes/requested-order-approver.route');
const orderDetailsRequested = require('./server/routes/order-details-requested.route');

// Usar as rotas importadas
app.use(loginRouter);
app.use(actionPageRouter);
app.use(requestMaterialsRouter);
app.use(ordersInProgressRouter); 
app.use(requesOrderApprover);
app.use(orderDetailsRequested);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
