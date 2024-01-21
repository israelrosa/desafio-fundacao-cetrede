import { NestFactory } from '@nestjs/core';
import { runSeeders } from 'typeorm-extension';
import { AppModule } from './app.module';
import { logger } from './shared/utils/logger';
import typeormConfig from './infrastructure/databases/typeorm/configs/typeorm.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = await typeormConfig.initialize();
  await runSeeders(dataSource);

  await app.listen(3001);
  logger.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
