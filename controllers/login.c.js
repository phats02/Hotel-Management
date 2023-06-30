const userM = require("../models/login.m");
const salt = 10;
const bcrypt = require("bcryptjs");

exports.main = async (req, res, next) => {
  var isLoggedIn = false;
  if (req.session.user != null) {
    isLoggedIn = true;
    res.redirect("/home");
  } else {
    res.redirect("/login/signin");
  }
};
exports.home = async (req, res, next) => {
  var isLoggedIn = false;
  if (req.session.user != null) {
    isLoggedIn = true;
    res.render("home", {
      isLoggedIn,
      account: req.session.user,
    });
  } else {
    res.redirect("/login/signin");
  }
};
exports.signin = async (req, res, next) => {
  if (req.method == "GET") {
    res.render("login/signin");
  } else if (req.method == "POST") {
    const username = req.body.username;
    const password = req.body.password;
    const exists = await userM.checkUserExist(username);
    const userDatabase = await userM.getUserByEmail(username);
    if (exists[0].exist === 1) {
      const compare = bcrypt.compareSync(password, userDatabase[0].MatKhau);

      if (compare) {
        req.session.user = req.body.username;
        res.redirect("/home");
      } else {
        res.render("login/signin", {
          error: "Incorrect password",
        });
      }
    } else {
      res.render("login/signin", {
        error: "Invalid user",
      });
    }
  }
};
exports.logout = async (req, res, next) => {
  req.session.user = null;
  res.redirect("/login/signin");
};
