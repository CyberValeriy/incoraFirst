/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { PORT } from "./config/application.config";

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  app.setGlobalPrefix("/api");
  const options = new DocumentBuilder()
    .setTitle("IncoraFirst API")
    .setDescription("API DOCUMENTATION")
    .setVersion("1.0.2")
    .build();

  const doc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api-doc", app, doc);

  await app.listen(PORT);
}
bootstrap();
