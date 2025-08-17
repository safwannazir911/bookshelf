import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { env } from "../env.js";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import { jwtOptions } from "./config/jwt.js";


passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
            let user;
            switch (jwtPayload.userType) {
                case "user":
                    user = await User.findOne({ _id: jwtPayload._id });
                    break;
            }
            if (!user) {
                return done(null, false);
            }
            user.userType = jwtPayload.userType;

            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }),
);


export const generateAccessToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRATION });
}


export const authenticateUser = passport.authenticate("jwt", {
    session: false,
});