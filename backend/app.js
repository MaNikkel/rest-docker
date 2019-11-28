// importa o express framework
const express = require("express");
// importa o parser para strings
const bodyParser = require("body-parser");
// importa o mongoose
const mongoose = require("mongoose");
// define o app express
const app = express();
// importa as rotas da agenda
const agendaRoutes = require("./routes/agendaRoutes");
// local que aponta para o banco de dados
const URL = //"mongodb://mongo:27017/agenda";
  "mongodb+srv://mnikkel-mongo:0204@cluster0-ob6d3.mongodb.net/agenda";
// usa o parser para json no app
app.use(bodyParser.json());
// define o acesso por CORS à aplicação
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// usa as rotas próprias
app.use("/agenda-rest", agendaRoutes);

//middlewere para lidar com erros
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message,
    data
  });
});

// conecta com o banco e inicia a aplicação
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(4000);
  })
  .catch(err => console.log(`ERROR IN CONNECTION WITH MONGOOSE::: ${err}`));
