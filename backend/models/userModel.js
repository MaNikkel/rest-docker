// importa o mongoose
const mongoose = require("mongoose");
// extrai o Schema do mongoose
const Schema = mongoose.Schema;
// define o schema para o contato
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);
// exporta a model baseada no schema. Já cria uma collection no banco também
module.exports = mongoose.model("User", userSchema);
