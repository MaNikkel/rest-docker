// importa o express framework
const express = require("express");
// importa o controller dos contatos
const agendaController = require("../controllers/agendaController");
// define um router do express
const router = express.Router();

//salva um novo contato
router.post("/contact", agendaController.postContact);

// retorna todos os contatos
router.get("/contacts", agendaController.getContacts);

module.exports = router;
