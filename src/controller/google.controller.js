const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
let clientId = process.env.GCLIENT;
let secret = process.env.GSECRET;
const passport = require('passport');
const UserDB = require('../model/user.model')

passport.serializeUser((user, cb) => {
    cb(null, user);
})
passport.deserializeUser((user, cb) => {
    cb(null, user);
});
try {
    passport.use(new GoogleStrategy({
        clientID: clientId,
        clientSecret: secret,
        callbackURL: "http://127.0.0.1:9000/api/user/auth/callback",
        passReqToCallback: true
    },
        async (request, accessToken, refereshToken, profile, done) => {
            let user = await UserDB.findOne({ email: profile._json.email });
            if (user) {
                return done(null, user);
            } else {
                const newUser = new UserDB({
                    name: profile.displayName,
                    email: profile.emails[0].value
                });
                await newUser.save();
                return done(null, newUser);
            }
        }
    ))
}
catch (err) {
    return done(err, false);
}




