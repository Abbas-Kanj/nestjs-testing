import { ClientProxyFactory, Transport } from '@nestjs/microservices';

async function main() {
  const client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 4001 },
  });

  client.emit('log', 'hello from the emit client').subscribe();
  console.log('emit() called - not waiting for a response, moving on immediately');

  setTimeout(() => client.close(), 500);
}

main();
