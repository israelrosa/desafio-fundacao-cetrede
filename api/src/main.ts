import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './shared/utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
  logger.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
