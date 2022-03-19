export default () => ({
  // App configuration
  mode: process.env.NODE_ENV,

  port: parseInt(process.env.APP_PORT, 10) || 3000,

  version: process.env.APP_VERSION || '1.0.0',

  // JWT configuration
  jwt: {
    token: process.env.JWT_TOKEN,
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL, 10) || 13600,
    refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL, 10) || 15,
  },

  // Multer configuration
  multer: {
    medias: {
      path: process.env.MULTER_MEDIA_PATH,
      size: parseInt(process.env.MULTER_MEDIA_SIZE, 10) || 500000,
      mimes: process.env.MULTER_MEDIA_MIMES.split(',') || [
        '.png',
        '.jpg',
        '.jpeg',
        '.svg',
      ],
    },
  },

  // Redis configuration
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    db: parseInt(process.env.REDIS_DB),
    password: process.env.REDIS_PASSWORD,
    keyPrefix: process.env.REDIS_PREFIX,
  },

  // AWS configuration
  aws: {
    acl: process.env.AWS_S3_ACL || 'public-read',
    bucketName: process.env.AWS_S3_BUCKET_NAME || 'test-name',
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
  },

  // Google configuration
  google: {
    callBackUrl: process.env.GOOGLE_CALLBACK_URL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_SECRET,
  },

  // Facebook configuration
  facebook: {
    callBackUrl: process.env.FACEBOOK_CALLBACK_URL,
    appId: process.env.FACEBOOK_APP_ID,
    secret: process.env.FACEBOOK_APP_SECRET,
  },
});
