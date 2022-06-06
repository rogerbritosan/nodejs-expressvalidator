const express = require('express');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// validação de dados
app.post('/user', [
    body('username').isEmail(),
    body('password').isLength({min: 5})
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors: errors.array()} );
    }

    res.json({msg: "sucesso"})
})

app.post('/validator-withmessage', [
    body('username').isEmail().withMessage("Digite um email válido"),
    body('password').isLength({min: 5}).withMessage("A senha precisa ter 5 ou mais caracteres")
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors: errors.array()} );
    }

    res.json({msg: "sucesso"})
})

app.post('/validator-custom', [
    body('username').custom(value => {
        if(value === "rogerbritosan@gmail.com"){
            return Promise.reject("E-mail já cadastrado");
        }
    })
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors: errors.array()} );
    }

    res.json({msg: "sucesso"})
})

// validação de api de criação
app.post('/register-user', [
    body('email').isEmail().withMessage("O e-mail precisa ser válido"),
    body('email').custom(value => {
        if(!value){
            return Promise.reject("E-mail é obrigatório")
        }
        if(value == "rogerbritosan@gmail.com"){
            return Promise.reject("E-mail já cadastrado")
        }
        return true;
    }),
    body('name').isLength({min: 3}).withMessage("Nome precisa ter no mínimo 3 caracteres"),
    body('password').isLength({min: 8}).withMessage("Senha precisa ter no mínimo 8 caracteres"),
    body('age').isNumeric().withMessage("Idade precisa ser número"),
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors: errors.array()} );
    }

    res.json({msg: "sucesso"})
})

app.listen(3000, () => {
    console.log("Running at port 3000");
});