const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const localstrategy = require('passport-local').Strategy
const { ExtractJwt } = require('passport-jwt')
const User = require('../models/User')

const GoogleTokenStrategy = require('passport-google-token').Strategy
const FacebookTokenStrategy = require('passport-facebook-token')
const config = require('../configs')
passport.use(new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: config.SECRET_JWT
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub)
    if (!user)
      return done(null, false)
    done(null, user)
  } catch (error) {
    done(error, false,)
  }
}))

// Passport Google

passport.use(new GoogleTokenStrategy({
  clientID: config.GOOGLE_CUSTOMER_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET_CODE
}, async (accessToken, refreshToken, profile, done) => {
  try {
    //check user
    console.log(profile);
    const user = await User.findOne({ authGoogleID: profile.id })
    if (user)
      return done(null, user)
    const newUser = new User({
      authType: 'google',
      email: profile.emails[0].value,
      authGoogleID: profile.id,
      name: profile.displayName,
      avatar: {
        url: profile._json.picture,
        address: 'web'
      }
    })
    await newUser.save()
    done(null, newUser)
  } catch (error) {
    console.log("error", error);
    done(error, false)
  }
}))

// Passport Facebook
passport.use(new FacebookTokenStrategy({
  clientID: config.FACEBOOK_CUSTOMER_ID,
  clientSecret: config.FACEBOOK_CLIENT_SECRET_CODE,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('accessToken', accessToken)
    console.log('refresh', refreshToken)
    console.log('profile', profile)

    //check user
    const user = await User.findOne({ authFacebookID: profile.id })
    if (user)
      return done(null, user)
    const newUser = new User({
      authType: 'facebook',
      email: profile.emails[0].value,
      authFacebookID: profile.id,
      name: profile.displayName,
      avatar: profile.photos[0].value
    })
    await newUser.save()
    done(null, newUser)
  } catch (error) {
    console.log("error", error);
    done(error, false)
  }
}))

// Passport Local
passport.use(new localstrategy({
  usernameField: "email"
}, async (email, password, done) => {
  try {
    console.log("account", email, password);
    const user = await User.findOne({ email })
    if (!user)
      return done(null, false)
    const isCorrect = await user.isValidPassword(password)
    if (!isCorrect)
      return done(null, false)
    done(null, user)
  } catch (error) {
    done(error, false)
  }
}))