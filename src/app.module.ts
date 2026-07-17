import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MathGatewayModule } from './math-gateway/math-gateway.module';

@Module({
  imports: [TasksModule, MathGatewayModule], // importing a module makes its exported providers available
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
