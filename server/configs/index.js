require('dotenv').config()

module.exports = {

  // Secret JWT
  SECRET_JWT: process.env.SECRET_JWT,

  // URL MongoDB
  MONGODB_URL: process.env.MONGODB_URL,

  // Google Oauth token 
  GOOGLE_CUSTOMER_ID: process.env.GOOGLE_CUSTOMER_ID,
  GOOGLE_CLIENT_SECRET_CODE: process.env.GOOGLE_CLIENT_SECRET_CODE,


  //Facebook Oauth Token
  FACEBOOK_CUSTOMER_ID: process.env.FACEBOOK_CUSTOMER_ID,
  FACEBOOK_CLIENT_SECRET_CODE: process.env.FACEBOOK_CLIENT_SECRET_CODE
}