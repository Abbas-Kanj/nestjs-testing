import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule], // importing a module makes its exported providers available
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
