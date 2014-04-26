var crypto = require('crypto'),
    passport = require('passport'),
    data = require('../models/auth')();


exports.registerPage = function(req, res) {
    res.render('login/register', {username: req.flash('username')});
}


exports.registerPost = function(req, res) {
    var vpw = req.body.vpw;
    var pwu = req.body.pw;
    var un = req.body.un;

    req.flash('username', un);

    if(vpw !== pwu) {
        req.flash('error', 'Your passwords did not match.');
        res.redirect('/register');
        return;
    }

    req.checkBody('un', 'Please enter a valid email.').notEmpty().isEmail();
    var errors = req.validationErrors();
    if (errors) {
        var msg = errors[0].msg;
        req.flash('error', msg);
        res.redirect('/register');
        return;
    }

    var new_salt = Math.round((new Date().valueOf() * Math.random())) + '';
    var pw = crypto.createHmac('sha1', new_salt).update(pwu).digest('hex');
    var created = new Date().toISOString().slice(0, 19).replace('T', ' ');

    new data.ApiUser({email: un, password: pw, salt: new_salt, created: created, active: 0}).save().then(function(model) {
        passport.authenticate('local')(req, res, function () {
            res.redirect('/home');
        })
    }, function(err) {
        req.flash('error', 'Unable to create account.'+err);
        res.redirect('/register');
    });
}


exports.loginPage = function(req, res) {
    res.render('login/index', {username: req.flash('username')});
}


exports.checkLogin = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
            res.send(401);
        } else{
            req.logIn(user, function(err) {
                console.log('req.login '+err);
                if (err) {
                    console.log('ERROR');
                    res.send('need to login...');
                } else {
                    console.log('logged in');
                    //res.send('Thank you for logging in');
                    //res.redirect('/home');
                    next();
                }
            });
        }
    })(req, res, next);
}
exports.checkAdmin = function(req,res,next){
    var usk = new data.userSkills();
    usk.query().where({uid:req.user.attributes.id}).select().then(function(result){
        console.log(result);
        next();
    });
}



exports.logout = function(req, res) {
    req.logout();
    req.flash('info', 'You are now logged out.');
    res.redirect('/login');
}
