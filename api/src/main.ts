import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('Accueil example')
  .setDescription('The cats Accueil description')
  .setVersion('1.0')
  .addTag('Accueil')
  .addTag('Profil')
  .addTag('iziplan')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app , document);
  app.enableCors();
  await app.listen(64000);
}
bootstrap();
