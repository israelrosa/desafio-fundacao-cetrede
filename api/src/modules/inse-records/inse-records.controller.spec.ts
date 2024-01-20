import { Test, TestingModule } from '@nestjs/testing';
import { InseRecordsController } from './inse-records.controller';
import { InseRecordsService } from './inse-records.service';

describe('InseRecordsController', () => {
  let controller: InseRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InseRecordsController],
      providers: [InseRecordsService],
    }).compile();

    controller = module.get<InseRecordsController>(InseRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
