import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import { ConfigService } from './common/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const configService: ConfigService = app.get(ConfigService);

  // Pipe
  app.useGlobalPipes(new ValidationPipe());
  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Banking app rest api')
    .setDescription('Banking app rest API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.port);
}
bootstrap();