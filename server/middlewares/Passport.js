import { Strategy, ExtractJwt } from 'passport-jwt'
import Account from '../models/Account.js'
import jwtHelper from './JwtHelper.js'

export const applyPassportStrategy = (passport) => {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = jwtHelper.secretSignature
    passport.use(new Strategy(opts, (jwt_payload, done) => {
     Account.findOne({email: jwt_payload.email}, (err, account) => {
            if (err) {
                return done(err, false);
            }
            if (account) {
                return done(null, account);
            } else {
                return done(null, false);
            }
        });
    }));
};