import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class MathController {
  @MessagePattern('sum')
  sum(numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
  }

  @EventPattern('log')
  handleLog(message: string) {
    console.log(`[event] received: ${message}`);
  }
}
