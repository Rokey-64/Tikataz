import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// Cấu hình Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5050/api/v1/accounts/google/callback",
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });
