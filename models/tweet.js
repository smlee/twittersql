/**
 * Created by sangmin on 5/4/15.
 */
var Sequelize = require('sequelize');

module.exports = function(db){
    var Tweet = db.define('Tweet', {
        tweet: Sequelize.STRING
    }, {
        timestamps: false // this will deactivate the time columns
    });

    return Tweet;
};