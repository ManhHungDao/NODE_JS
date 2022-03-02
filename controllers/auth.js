exports.getLogin = (req, res, next) => {
  res
    .render("auth/login", {
      path: "/login",
      pageTitle: "Login",
    })
    .catch((err) => console.log(err));
};
