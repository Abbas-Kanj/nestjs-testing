import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import * as schema from '../db/schema';
import { DB_TOKEN } from '../db/database.module';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';

type DB = BetterSQLite3Database<typeof schema>;

@Injectable()
export class TasksService {
  constructor(@Inject(DB_TOKEN) private db: DB) {}

  getAll() {
    return this.db.select().from(schema.tasks);
  }

  async getById(id: string) {
    const tasks = await this.db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.id, id));

    if (!tasks[0]) throw new NotFoundException(`Task ${id} not found`);
    return tasks[0];
  }

  create(dto: CreateTaskDTO) {
    const id = crypto.randomUUID();
    this.db
      .insert(schema.tasks)
      .values({ id, ...dto })
      .run();

    return this.getById(id);
  }

  async updateStatus(id: string, status: schema.TaskStatus) {
    await this.getById(id);
    this.db
      .update(schema.tasks)
      .set({ status })
      .where(eq(schema.tasks.id, id))
      .run();

    return this.getById(id);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    this.db.delete(schema.tasks).where(eq(schema.tasks.id, id)).run();
  }
}
