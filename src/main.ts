import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/print');

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
          transform: true
      })
  );

    const config = new DocumentBuilder()
    .setTitle('MS Print Order')
    .setDescription('MS for receiving and processing digital document print requests, grouped into print orders')
    .setVersion('1.0')
    .addTag('print-orders')
    .build();
   const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
