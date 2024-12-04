const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    let errors = {email: '', password: '', name: ''};

    // incorrect email

    if(err.message === 'Incorrect email!'){
        errors.email = 'Email is not registered!';
    };

    // incorrect password

    if(err.message === 'Incorrect password!'){
        errors.password = 'Password is incorrect!';
    };


    // duplicate error

    if(err.code === 11000){
        errors.email = 'Email is already taken';
        return errors;
    };

    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    };

    return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'net ninja secret', {
        expiresIn: maxAge
    });
}

const register_post = async(req, res) => {
    const {name, email, password, role} = req.body;
    try {
        const user = await User.create({
            name: name,
            email: email,
            password: password,
            role: role
        });
        res.status(200).json({message: 'Register successful!'});
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors});
    }
};

const login_post = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id})
    } catch (error) {
        const errors = handleErrors(error);
        res.status(500).json({ errors });
    }
};

const login_get = async(req, res) => {
    res.render('auth/login');
};

const register_get = async(req, res) => {
    res.render('auth/register');
};

const home = async(req, res) => {
    res.render('home');
};

const smoothies = async(req, res) => {
    res.render('smoothies');
};

const logout_get = async(req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
};

module.exports = {register_post, login_post, login_get, register_get, home, smoothies, logout_get};

