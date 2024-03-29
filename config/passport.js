const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require("../models/user")
const passport = require("passport")
let opts = {}


opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = '69q107jk57126';


passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload)

    UserModel.findOne({
        id: jwt_payload.id
    }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));