import { NestFactory } from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {AppModule} from "./modules/app.module";
import {AppUsageInterceptor} from "./config/interceptors/request-log.interceptor";
import {AppLogsService} from "./modules/app-logs/app-logs.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.setGlobalPrefix('api');

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
          transform: true
      })
  );

    const appLogsService = app.get(AppLogsService);
    app.useGlobalInterceptors(new AppUsageInterceptor(appLogsService));

    const config = new DocumentBuilder()
    .setTitle('MS Print Order')
    .setDescription('MS for receiving and processing digital document print requests, grouped into print orders')
    .setVersion('1.0')
    .addTag('print-orders')
    .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
        'jwt'
    )
    .build();
   const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document,  {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
