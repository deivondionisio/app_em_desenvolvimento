// controllers/materialController.js
const Material = require('../../database/models/materiais.model'); // caminho correto para seu modelo

const getMaterials = async (req, res) => {
  try {
    const materials = await Material.findAll({ attributes: ['id', 'nome'] });
    res.render('form', { materials }); // 'form' é o nome do seu template EJS
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getMaterials };
