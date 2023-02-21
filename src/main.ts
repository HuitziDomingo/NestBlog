import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Documentacion de API Blog')
    .setDescription('Esta API es para mi Blog')
    .setVersion('1.0')
    .addTag('users')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(process.env.PORT || 4000)
}
bootstrap();
