
var rendering = require('./util/rendering'),
    indexController = require('./controllers/index'),
    loginController = require('./controllers/login'),
    passport = require('passport'),
    data = require('./models/data')();


module.exports = function (app, passport) {

    app.get('/api', function(req, res) {

            res.json('api OK');
    });

    app.get('/user', loginController.checkLogin, function(req, res) {
        var usk = new data.user();
        usk.query().where({id:req.user.attributes.id}).select().then(function(result){
            res.json(result);
        });
    });
    app.get('/skills', loginController.checkLogin, function(req, res) {
        var usk = new data.userSkills();
        usk.query().where({uid:req.user.attributes.id}).select().then(function(result){
            res.json(result);
        });
    });
    app.get('/addSkill', loginController.checkLogin, function(req, res) {
        if (req.user.attributes.admin){
            res.json('can add a skill');
        } else {
            res.send(401);
        }

    });
    app.get('/addUserSkill', loginController.checkLogin, function(req, res) {
        //res.json('add new Skill Association');
        new data.userToSkill({id:4,uid:req.user.attributes.id,sid:3})
            .save({id:4,uid:req.user.attributes.id,sid:3},{method:"insert"})
            .then(function(model){
                res.json(model);
            });

    });

}
