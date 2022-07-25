/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { PORT } from "./config/application.config";
import { logLaunch } from "./utils/log.util";

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  app.setGlobalPrefix("/api");
  const options = new DocumentBuilder()
    .setTitle("IncoraFirst API")
    .setDescription("API DOCUMENTATION")
    .setVersion("1.0.3")
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api-doc", app, doc);
    
 const server =  await app.listen(PORT, logLaunch);

 process.on("SIGINT",()=>{
  server.close(()=>{
    process.exit(0);
  });
});

process.on("SIGTERM",()=>{
  server.close(()=>{
    process.exit(0);
  });
});

}
bootstrap();

