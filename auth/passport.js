const passPort = require("passport")
const googleStrategy = require("passport-google-oauth2").Strategy
const dotEnv = require("dotenv").config()


passPort.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:6969/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        console.log("profile", profile)
        return done(err, profile);

    }
));

passPort.serializeUser((user, done) => {
    return done(null, user)
})

passPort.deserializeUser((user, done) => {
    return done(null, user)
})
