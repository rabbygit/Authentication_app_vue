const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/Users");
const key = require("./keys").secret;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = passport => {
  passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
          User.findById(jwt_payload._id).then(user =>{
              if(user){
                  return done(null , user)
              }else{
                  return done(null , false)
              }
          }).catch(err =>{
              console.log(err)
          })
      }
    ));
};
