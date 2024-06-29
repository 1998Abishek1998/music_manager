import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { Database } from '../types/database.types'

class DatabaseConfig {
  static db: DB

  constructor() {

    const dialect = new PostgresDialect({
      pool: new Pool({
        database: 'testdb',
        host: 'localhost',
        user: 'sapta',
        port: 5432,
        max: 10,
        password: 'Sapta@123',
      })
    })

    const db = new Kysely<Database>({
      dialect,
    })

    DatabaseConfig.db = db
  }

  getInstance() {
    return DatabaseConfig.db
  }
}

export const db = new DatabaseConfig().getInstance()

export type DB = Kysely<Database>
