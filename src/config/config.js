require('dotenv').config(); 

module.exports = {
  env: process.env.NODE_ENV || 'development',
  db: {
    uri: process.env.DB_URI,  
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  port: process.env.PORT || 5000, 
  jwtSecret: process.env.JWT_SECRET,  
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',  
};