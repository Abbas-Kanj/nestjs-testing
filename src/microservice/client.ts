import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

async function main() {
  const client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 4001 },
  });

  const result = await firstValueFrom(
    client.send<number, number[]>('sum', [1, 2, 3, 4]),
  );
  console.log('sum result:', result);

  await client.close();
}

main();
