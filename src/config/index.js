if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }
}

const config = {};
config.PORT = process.env.PORT || 8000;
config.DB_URI = process.env.DB_URI;
config.SECRET = process.env.SECRET;
config.CLIENT_SUCCESS_URI = process.env.CLIENT_SUCCESS_URI;

config.S3 = {
  bucketName: process.env.S3_BUCKET_NAME,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
};

config.GOOGLE = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

config.FACEBOOK = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
};

module.exports = config;
