const router = require('express').Router();
const passport = require('passport');

module.exports = app => {
    router.route('/')
        .get((req, res) => res.json({message: "Home Route"}));

    app.use('/home', passport.authenticate('jwt', { session: false }), router)
};