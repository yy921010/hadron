import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url:'localhost:33207',
    package: ['oauth'],
    protoPath: join(__dirname,'./protobufs/oauth2.proto'),
  },
};
