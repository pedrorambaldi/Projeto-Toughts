const User = require("../models/User");

const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {

    const {email, password} = req.body

    // FIND USER
    const user = await User.findOne({where: {email: email}})

    if(!user) {
      req.flash("message", "Usuário não encontrado!");
      res.render("auth/login");

      return;
    }

    // CHECK IF PASSWORD MATCH
    const passwordMatch = bcrypt.compareSync(password, user.password)

    if(!passwordMatch) {
      req.flash("message", "Senha inválida!");
      res.render("auth/login");

      return;
    }
    // INITIALIZE SESSION
    req.session.userid = user.id;

    req.flash("message", "Autenticação realizada com sucesso!");

    req.session.save(() => {
      res.redirect("/");
    });
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    // PASSWORD MATCH VALIDATION
    if (password != confirmpassword) {
      req.flash("message", "As senhas não conferem, tente novamente");
      res.render("auth/register");

      return;
    }

    // CHECK IF USER EXISTS
    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      req.flash("message", "0 e-mail já está em uso!");
      res.render("auth/register");

      return;
    }

    // CREATE A PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };
    try {
      const createdUser = await User.create(user);

      // INITIALIZE SESSION
      req.session.userid = createdUser.id;

      req.flash("message", "Cadastro realizado com sucesso!");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.log(err);
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
};
