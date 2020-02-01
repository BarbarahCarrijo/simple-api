const router = require('express').Router();
const User = require('../../database/models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const {secretKey} = require('../../environment/vars');

module.exports = app => {
    router.post("/login", (req, res, next) => {
        passport.authenticate('local',
            {session: false},
            (err, user, info) => {
                if (err) {
                    return res.status(500).json({err})
                }

                if (!user) {
                    const {message} = info;
                    return res.status(401).json({message})
                }

                // Se o usuário estiver cadastrado no banco, ele irá receber um token
                // com validade de 1 hora! Após este tempo, ele não poderá mais acessar
                // as rotas protegidas!
                const {_id} = user;
                const token = jwt.sign({_id}, secretKey, {expiresIn: '1h'});

                res.cookie('jwt', token, {
                    httpOnly: false,
                    secure: false
                })
                    .status(200)
                    .send({msg: "Succesful Login!"})

            })(req, res, next)
    });

    router.post("/register", (req, res) => {
        const {password, name, email} = req.body;

        // Senha é criptografada e o usuário adicionao ao banco de dados
        bcrypt.hash(password, saltRounds)
            .then(async (hash) => {
                await User.create({name, email, password: hash}, (err, newUser) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({error: "User already exists!"})
                    }

                    return res.json({message: "User created!"})
                })
            })
    });

    app.use("/auth", router)
}