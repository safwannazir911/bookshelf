import { ExtractJwt } from "passport-jwt";
import { env } from "../../env.js";

export const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.JWT_SECRET,
};