import { Test, TestingModule } from '@nestjs/testing';
import { TuneController } from './tune.controller';

describe('TuneController', () => {
  let controller: TuneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TuneController],
    }).compile();

    controller = module.get<TuneController>(TuneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
