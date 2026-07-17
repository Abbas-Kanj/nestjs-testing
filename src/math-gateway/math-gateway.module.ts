import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MathGatewayController } from './math-gateway.controller';
import { MATH_SERVICE, MATH_SERVICE_TCP_PORT } from './math-gateway.constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MATH_SERVICE,
        transport: Transport.TCP,
        options: { host: 'localhost', port: MATH_SERVICE_TCP_PORT },
      },
    ]),
  ],
  controllers: [MathGatewayController],
})
export class MathGatewayModule {}
