exports.getLogin = (req, res, next) => {
  res
    .render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      isAuthenticated: req.isLoggedIn,
    })
    .catch((err) => console.log(err));
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
