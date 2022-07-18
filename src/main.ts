/* eslint-disable prettier/prettier */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  await app.listen(8080);
}
bootstrap();

/*
GENERAL TASKS

Setup nest ✓
Database connection ✓
Migrations
Authorization
Entities ✓
Valdiation
Swagger doc

METHODS:
Create user ✓
Update user
Add products to the order
Accept order
CRUD Products ✓

*/
