import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MATH_SERVICE } from './math-gateway.constants';

@Controller('math')
export class MathGatewayController {
  constructor(@Inject(MATH_SERVICE) private readonly client: ClientProxy) {}

  @Post('sum')
  async sum(@Body('numbers') numbers: number[]) {
    const result = await firstValueFrom(
      this.client.send<number, number[]>('sum', numbers),
    );
    return { result };
  }

  @Post('log')
  log(@Body('message') message: string) {
    this.client.emit('log', message);
    return { status: 'sent' };
  }
}
