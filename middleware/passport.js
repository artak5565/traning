const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('config')
const Admin = require('../models/admin')

const jwtStrategyHeaderBearer = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get('jwtSecret')
    },
    async (payload, done) => {
        try {
            const user = await Admin.findById(payload.id);
            if(user){
                done(null, user)
            } else {
                done(null, false)
            }
        } catch (error) {
            console.log(`Error passport: ${error}`)
        }
    }  
)

module.exports = passport => {
    passport.use(jwtStrategyHeaderBearer)
}
