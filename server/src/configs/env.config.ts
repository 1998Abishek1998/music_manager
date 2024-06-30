import { configDotenv } from 'dotenv';

configDotenv();

export default {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || '',
  APP_TIMEZONE: process.env.APP_TIMEZONE || '',
  JWT_EXPIRES_IN: "1d",
  ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET || "arkHrkXLKbAQCxTkys/N+X1tN9TbWoYiNfX+Efk/1MvSFtfJCrFKfA==",
  ARTIST_JWT_SECRET: process.env.ARTIST_JWT_SECRET || "gv4+4t9Zp4OD/CWQEwsQkiLYeUX3fCreu602587718On80HEZT0wV48JOTwWfpRnCJbDBxHC1Q3gOOEODbAtfqA:",
  ARTIST_MANAGER_JWT_SECRET: process.env.ARTIST_MANAGER_JWT_SECRET || "wPVUx3IMj9OBexrwdOLj0cjM6lk2vXggj6hF/K858Qg:",
}
