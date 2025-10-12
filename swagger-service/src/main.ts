import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  setupSwagger(app);
  await app.listen(process.env.PORT || 3002);
}
bootstrap();

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Microservices API Documentation')
    .setDescription('Centralized API documentation for all microservices')
    .setVersion('1.0')
    .addServer('http://localhost:8080', 'Development server')
    .addServer('http://localhost:4000', 'Backend service')
    .addServer('http://localhost:4001', 'Auth service')
    .build();
    
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}