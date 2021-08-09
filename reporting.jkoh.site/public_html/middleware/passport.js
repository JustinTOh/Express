const user = require('../models/users')
const { SECRET } = require('../config')
const { Strategy } = require('passport-jwt')

const cookieExtractor = req => {
    let token = null
    if(req && req.cookies) {
        token = req.cookies['token']
    }
    return token
}

const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: SECRET
}

module.exports = (passport) =>{
    passport.use(
        new Strategy(opts, async (payload, done) => {
            await user.findById(payload.user_id)
                .then(user => {
                    if(user){
                        return done(null, user)
                    }
                    return done(null, false)
            })
            .catch((err) => {
                return done(null, false)
            })
        })
    )
}