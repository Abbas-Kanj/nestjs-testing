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

  getById(id: string) {
    const task = this.db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.id, id));

    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  create(dto: CreateTaskDTO) {
    const id = crypto.randomUUID();
    this.db
      .insert(schema.tasks)
      .values({ id, ...dto })
      .run();

    return this.getById(id);
  }

  updateStatus(id: string, status: schema.TaskStatus) {
    this.getById(id);
    this.db
      .update(schema.tasks)
      .set({ status })
      .where(eq(schema.tasks.id, id))
      .run();

    return this.getById(id);
  }

  delete(id: string): void {
    this.getById(id);
    this.db.delete(schema.tasks).where(eq(schema.tasks.id, id)).run();
  }
}
