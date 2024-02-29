// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { json } from 'express';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors({
//     origin: ['http://localhost:3001', 'http://localhost:3000'], // Add your frontend domain here
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     credentials: true,
//   });
//   app.use(json({ limit: '16mb' }));
//   await app.listen(3000);
// }

// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Alternatively, you can specify the CORS options manually:
  // app.enableCors({
  //   origin: ['http://localhost:3001', 'http://localhost:3000', 'https://bookstore-web.vercel.app'],
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  //   credentials: true,
  // });

  app.use(json({ limit: '16mb' }));

  await app.listen(3000);
}

bootstrap();
