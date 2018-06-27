const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const facebookAuth = require('./auth.js');

var users = [
{"id":111, "username":"amy", "password":"amyspassword"},
{ 
    "id" : "222",
    "email" : "test@test.com", 
    "name" : "Ben", 
    "token" : "DeSag3sEgaEGaYRNKlQp05@diorw"}
];

function findUser(id) {
    for(var i=0; i<users.length; i++) {
        if(id === users[i].id) {
            return users[i]
        }
    }
    return null;
}

passport.serializeUser(function (user, done) {
    console.log('serial', user)
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    console.log('deserial', id, findUser(id))
    done(null, findUser(id));

});

passport.use(new FacebookStrategy({
    "clientID"        : facebookAuth.clientID,
    "clientSecret"    : facebookAuth.clientSecret,
    "callbackURL"     : facebookAuth.callbackURL
},
function (token, refreshToken, profile, done) {
    console.log('testttt', profile)
    var user = findUser(profile.id);
    if (user) {
        console.log(users);
        return done(null, user);
    } else {
      console.log('profile', profile)
        var newUser = {
            "id":       profile.id,
            "name":     profile.displayName,
            "email":    (profile.emails || '').toLowerCase(),
            "token":    token
        };
        users.push(newUser);
        console.log(users);
        return done(null, newUser);
    }
}));

module.exports = passport;
