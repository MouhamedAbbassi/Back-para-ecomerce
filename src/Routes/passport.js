

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

const setUpPassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new GoogleStrategy({
    clientID:"682851405471-m6md7aqpdd0v5acq8mmo3nkug08ele7c.apps.googleusercontent.com", // Your Credentials here.
    clientSecret:"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", // Your Credentials here.
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }));
};

export default setUpPassport;