import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS options
  const corsOptions: CorsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  
  // Enable CORS
  app.enableCors(corsOptions);
  
  await app.listen(8080);
}
bootstrap();
