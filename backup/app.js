// app.js ou server.js
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// Serve arquivos estáticos
app.use(express.static(path.join(__dirname, 'views', 'platform')));

// Importar e usar as rotas
const loginRoutes = require('./server/routes/auth.route');
const mainMenuRoutes = require('./server/routes/action-panel.route');
const materialRequisitionRoutes = require('./server/routes/materials.route');
const userManagementRoutes = require('./server/routes/manage-user.route');
const requisitionManagementRoutes = require('./server/routes/requisitions-manager.route');
const requisitionApprovalRoutes = require('./server/routes/requestions-appove.route');

app.use('/', loginRoutes);
app.use('/menu', mainMenuRoutes);
app.use('/menu/materials/requisition', materialRequisitionRoutes);
app.use('/menu/users/manage', userManagementRoutes);
app.use('/menu/requisitions/manage', requisitionManagementRoutes);
app.use('/menu/requisitions/approve', requisitionApprovalRoutes);

// Aqui você incluiria outras rotas e configurações do servidor

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
