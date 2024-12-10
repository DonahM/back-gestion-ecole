import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || 3000;

  app.setGlobalPrefix('api');


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // <- This line here
      },
    }), // Remove all unused properties from request using class transformer
  );

  await app.listen(port, () => {
    console.log(`Server is running on port : http://localhost:${port}`);
  });
}
bootstrap();
