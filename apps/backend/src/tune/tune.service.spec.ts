import { Test, TestingModule } from '@nestjs/testing';
import { TuneService } from './tune.service';

describe('TuneService', () => {
  let service: TuneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TuneService],
    }).compile();

    service = module.get<TuneService>(TuneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
