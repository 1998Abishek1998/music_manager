import { configDotenv } from 'dotenv';

configDotenv();

export default {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || '',
  APP_TIMEZONE: process.env.APP_TIMEZONE || '',
  JWT_EXPIRES_IN: "1d",
  ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET || "1MvSFtfJCrFKfA==",
  ARTIST_JWT_SECRET: process.env.ARTIST_JWT_SECRET || "gv44t9Zp4OD",
  ARTIST_MANAGER_JWT_SECRET: process.env.ARTIST_MANAGER_JWT_SECRET || "somesekret",
}
