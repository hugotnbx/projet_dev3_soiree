import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  faitRien():undefined{
  }
  rien(): string{
    return 'malheuresement toujours rien';
  }
}
