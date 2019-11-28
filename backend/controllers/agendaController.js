// importa a model de contato
const Contact = require("../models/contactModel");

/**
 * Função GET => Contacts
 * retorna todos os contatos listados
 */
exports.getContacts = async (req, res, next) => {
  try {
    //espera o retorno de todos os contatos
    const contacts = await Contact.find();
    // caso não existam contatos, retorna a mensagem
    if (!contacts || !contacts.length) {
      res
        .status(404)
        .json({ message: "sem contatos para mostrar pelo docker..." });
    }
    // caso existam, envia-os
    res
      .status(200)
      .json({
        message: "Contatos encontrados em docker acho q nem foi!",
        contacts
      });
  } catch (err) {
    // manda para o middleware de erros
    next(err);
  }
};

/**
 * Função POST => Contact
 * Salva um novo contato no banco
 */

exports.postContact = async (req, res, next) => {
  try {
    // recolhe os dados vindos do body (com parser para json já setado em app.js)
    const { name, email } = req.body;
    // salva o novo contato
    const contact = new Contact({
      name,
      email
    });
    // espera salvar no banco
    const result = await contact.save();
    // retorna a confirmação
    res.status(200).json({
      message: "dados recebidos pelo docker!",
      name,
      email,
      result
    });
  } catch (error) {
    next(error);
  }
};
