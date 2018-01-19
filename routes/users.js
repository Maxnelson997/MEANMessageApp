var express = require('express');
var router = express.Router();

var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')

router.post('/', function (req, res, next) {
    const saltRounds = 10;
    const myPlaintextPassword = req.body.password
    const someOtherPlaintextPassword = 'not_bacon';
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(myPlaintextPassword, salt);
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hash,
        email: req.body.email
    });
    console.log(user);
    user.save(function(err, result) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});


module.exports = router;
