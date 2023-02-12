//jshint esversion: 6

exports.isAuth = (req, res, next) => {
    if (req.session.isAuth !== true) return res.redirect("/auth/login");
    next();
};