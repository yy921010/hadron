import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const microserviceOption: MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    url:'localhost:33027',
    package: ['user'],
    protoPath: ['./src/grpc/protobufs/user.module.proto']
  },
}
export {microserviceOption};
