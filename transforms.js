//

require('dotenv').config();

function getEnv(name) {
  return process.env[name];
}

const transforms = {
  HOME_URL: getEnv('HOME_URL'),

  TITLE: getEnv('TITLE'),
  DESCRIPTION: getEnv('DESCRIPTION'),
  KEYWORDS: getEnv('KEYWORDS'),

  AUTHOR: getEnv('AUTHOR'),
  AUTHOR_IMAGE: getEnv('AUTHOR_IMAGE'),

  TWITTER_USERNAME: getEnv('TWITTER_USERNAME'),

  GOOGLE_PROFILE: getEnv('GOOGLE_PROFILE'),
  GOOGLE_SITE_VERIFICATION: getEnv('GOOGLE_SITE_VERIFICATION'),

  GOOGLE_ANALYTICS_UA: getEnv('GOOGLE_ANALYTICS_UA'),

  FACEBOOK_APP_ID: getEnv('FACEBOOK_APP_ID'),
};

module.exports = transforms;
