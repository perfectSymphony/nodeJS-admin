'use strict';

// be careful when setting this to true, 
// as compliant clients will not allow client-side JavaScript to see the cookie in document.cookie
module.exports = {
  port: parseInt(process.PORT,10) || 8001,
  url: 'mongodb://localhost:27017/nodeJS-admin',
  session: {
    name: 'SID',
    secret: 'SID',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge:   365 * 24 * 60 * 60 * 1000,
    }
  }
}