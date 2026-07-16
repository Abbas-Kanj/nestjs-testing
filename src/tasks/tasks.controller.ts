import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { ApiKeyGuard } from './guards/api-key.guard';
import type { TaskStatus } from '../db/schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll() {
    return this.tasksService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.tasksService.getById(id);
  }

  @Post()
  create(@Body() dto: CreateTaskDTO) {
    return this.tasksService.create(dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.tasksService.updateStatus(id, status);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(ApiKeyGuard)
  delete(@Param('id') id: string) {
    this.tasksService.delete(id);
  }
}
