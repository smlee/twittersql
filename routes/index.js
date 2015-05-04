var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();

var bodyParser = require('body-parser');
var models = require('../models/');

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

var User = models.User, Tweet = models.Tweet;

//var newList = new fql(tweetBank.list);
module.exports = function (io) {
    // ...
    // route definitions, etc.
    // ...
    //console.log(models.Tweet);
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
        User.find({where: { name: name } }).then(function(result){
            if(result){
                Tweet.create({tweet:text, UserId: result.dataValues.id}).then(function(){
                    res.redirect('/');
                });
            } else {
                User.create({name:name, pictureUrl: null}).then(function(user){
                    Tweet.create({name: user.dataValues.name, UserId: user.dataValues.id}).then(function(){
                        res.redirect('/');
                    })

                });
                //console.log("new user.")
            }
        });
        io.sockets.emit('new_tweet', { name: name, text: text });
    });

    return router;
};