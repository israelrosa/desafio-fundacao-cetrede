import { Test, TestingModule } from '@nestjs/testing';
import { InseRecordsService } from './inse-records.service';

describe('InseRecordsService', () => {
  let service: InseRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InseRecordsService],
    }).compile();

    service = module.get<InseRecordsService>(InseRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
