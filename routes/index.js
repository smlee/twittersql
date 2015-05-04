var express = require('express'), router = express.Router(), bodyParser = require('body-parser'), models = require('../models/');

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

var User = models.User, Tweet = models.Tweet;
module.exports = function (io) {

    router.get('/users/:name', function(req, res) {
        var name = req.params.name;
        User.find( {where: { name: name } }).then(function(user){
            user.getTweets().then(function(list) {
                res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list, showForm:true, name:name } );
            })
        })
    });

    router.get('/', function (req, res) {
        Tweet.findAll({include: [ User ]}).then(function(tweets) {
            //console.log('tweets', tweets[0].dataValues.Tweets);
            var tweets = tweets;
            res.render( 'index', { title: 'Twitter.js', tweets: tweets ,showForm: true} );
        });

    });

    router.post('/submit', function(req, res) {
        var name = req.body.name;
        var text = req.body.text;
        User.findOrCreate({where: { name: name } }).spread(function(user, result){
                Tweet.create({tweet:text, UserId: user.id}).then(function(){
                    res.redirect('/');
                });
        });
        io.sockets.emit('new_tweet', { name: name, text: text });
    });

    return router;
};