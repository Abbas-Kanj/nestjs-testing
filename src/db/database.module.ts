import { Module } from '@nestjs/common';
import * as schema from './schema';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
export const DB_TOKEN = 'DB_TOKEN';

@Module({
  providers: [
    {
      provide: DB_TOKEN,
      useFactory: () => {
        const sqlite = new Database('sqlite.db');
        return drizzle(sqlite, { schema });
      },
    },
  ],
  exports: [DB_TOKEN],
})
export class DatabaseModule {}
