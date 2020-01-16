// importa o módulo de criptografia
const bcrypt = require("bcryptjs");
// importa o jwt
const jwt = require("jsonwebtoken");
// importa a model do user
const User = require("../models/userModel");

// exporta a função de signup
exports.putSignup = async (req, res, next) => {
  // coleta o corpo da req
  const { name, email, password } = req.body;
  // se as propriedades existirem
  if (name && email && password) {
    // faz o hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    const result = await user.save();
    if (result) {
      res.status(200).json({
        name,
        email,
        password
      });
    }
  }
};

//exporta função de login
exports.postLogin = async (req, res, next) => {
  try {
    // recupera o corpo da requisição
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(200).json({ message: "falta dado" });
    }
    // para guardar o usuário
    let loadedUser;
    // encontra o usário pelo email
    const user = await User.findOne({ email });
    // caso não encontre, lança um erro
    if (!user) {
      throw new Error("usuário não encontrado");
    }
    // caso contrário, salva o user
    loadedUser = user;
    // compara as senhas do banco com a fornecida
    const doMach = await bcrypt.compare(password, user.password);
    // caso as senhas não sejam iguais, lança um erro
    if (!doMach) {
      throw new Error("senhas não batem");
    }
    // * gera o token para acesso
    const token = jwt.sign(
      {
        email: loadedUser.email,
        password: loadedUser.password
      },
      "aquificaosecret",
      { expiresIn: "1h" }
    );
    // retorna mensagem de que está logado
    res
      .status(200)
      .json({ message: "logado!", token, userId: loadedUser._id.toString() });
  } catch (error) {
    throw new Error(error);
  }
};
