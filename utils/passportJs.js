const dotenv = require("dotenv");
const { User } = require("../models");

dotenv.config();
const passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRECT_KEY;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, next) {
    let isuser = await User.findOne({ where: { id: jwt_payload.id } });
    if (isuser) {
      next(null, isuser);
    } else {
      return next({
        success: false,
        message: "User logout.",
        response: {
          user_deleted: true,
        },
      });
    }
  })
);
