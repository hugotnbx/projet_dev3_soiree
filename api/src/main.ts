import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as https from 'https';

async function bootstrap() {
  const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/archive/l2-1.ephec-ti.be/privkey1.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/archive/l2-1.ephec-ti.be/fullchain1.pem'),
  };
  const app = await NestFactory.create(AppModule,{httpsOptions,});
  
  const config = new DocumentBuilder()
  .setTitle('Documentation API - Projet Iziplan')
  .setVersion('1.0')
  .addTag('Events')
  .addTag('Users')
  .addTag('Statuses')
  .addTag('Contributions')
  .addTag('UsersRelations')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app , document);
  app.enableCors();
  await app.listen(64000);
}
bootstrap();
