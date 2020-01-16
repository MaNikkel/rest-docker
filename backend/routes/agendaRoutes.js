// importa o express framework
const express = require("express");
// importa o controller dos contatos
const agendaController = require("../controllers/agendaController");
// middlewate para verificar se está autenticado
const isAuth = require("../middlewares/is-auth");
// define um router do express
const router = express.Router();

//salva um novo contato
router.post("/contact", isAuth, agendaController.postContact);

// retorna todos os contatos
router.get("/contacts", isAuth, agendaController.getContacts);

module.exports = router;
