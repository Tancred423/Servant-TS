import 'dotenv/config'
import { RowDataPacket } from 'mysql2'
import * as mysql from 'mysql2/promise'
import { Pool } from 'mysql2/promise'

export class Database {
  private static pool: Pool
  private static readonly POOL_CONFIG = {
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASS'],
    database: process.env['DB_DB'],
    supportBigNumbers: true,
    bigNumberStrings: true,
    charset: 'utf8mb4',
    timezone: '+00:00',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }

  private constructor() {}

  private static getInstance(): Pool {
    if (!this.pool) this.pool = mysql.createPool(this.POOL_CONFIG)
    return this.pool
  }

  public static async query(sql: string): Promise<any> {
    const database = this.getInstance()
    const result = (await database.query(sql)) as RowDataPacket[]
    return result[0][0] ?? {}
  }

  public static escape(string: string): string {
    return mysql.escape(string)
  }
}
