/**
 * Created by sangmin on 5/4/15.
 */
// pull in the Sequelize library
var Sequelize = require('sequelize');
// create an instance of a database connection
// which abstractly represents our app's mysql database
var twitterjsDB = new Sequelize('twitterjs', 'root', 'toor', {
    dialect: "mysql",
    port:    3306,
});

// open the connection to our database
twitterjsDB
    .authenticate()
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    })
    .then(function() {
        console.log('Connection has been established successfully.');
    });

var User = require('./user')(twitterjsDB);
var Tweet = require('./tweet')(twitterjsDB);


// adds a UserId foreign key to the `Tweet` table
User.hasMany(Tweet);
Tweet.belongsTo(User);

module.exports = {
    User: User,
    Tweet: Tweet
};