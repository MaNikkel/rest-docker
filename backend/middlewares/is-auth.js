// importa o jwt
const jwt = require("jsonwebtoken");

// exporta a verificação se está autenticado
module.exports = (req, res, next) => {
  // recupera a header de autorização, setada pelo jwt
  const authHeader = req.get("Authorization");
  // caso não possua, lança um erro
  if (!authHeader) {
    const error = new Error("Campo Authorization inexistente");
    error.statusCode = 401;
    throw error;
  }
  // pega uma header com req.get
  const token = authHeader.split(" ")[1];
  // para guardar o token
  let decodedToken;
  try {
    // verifica o token baseado no secret
    decodedToken = jwt.verify(token, "aquificaosecret");
  } catch (err) {
    throw err;
  }
  // se o token não bate, lança um erro
  if (!decodedToken) {
    const error = new Error("Usuário não autenticado");
    error.statusCode = 401;
    throw error;
  }
  // salva o ID salvo no token para todas as requisições
  req.userId = decodedToken.userId;
  next();
};
