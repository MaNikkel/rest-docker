// importa o express framework
const express = require("express");
// importa o jsonwebtoken para autenticação
const jwt = require("jsonwebtoken");
// importa o controller dos contatos
const authController = require("../controllers/authController");

// define um router do express
const router = express.Router();
// rota para cadastro de user
router.put("/signup", authController.putSignup);
// rota para login
router.post("/login", authController.postLogin);

module.exports = router;
