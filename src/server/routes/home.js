const router = require('express').Router();

module.exports = app => {
    router.route('/')
        .get((req, res) => res.json({message: "Home Route"}));

    // middleware
    app.use('/home', router)
};