import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MicroserviceModule } from './microservice.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MicroserviceModule,
    {
      transport: Transport.TCP,
      options: { host: 'localhost', port: 4001 },
    },
  );

  await app.listen();
  console.log('Math microservice listening on TCP port 4001');
}
bootstrap();
