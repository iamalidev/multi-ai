import { Module } from '@nestjs/common';
import { TuneController } from './tune.controller';
import { TuneService } from './tune.service';

@Module({
  controllers: [TuneController],
  providers: [TuneService],
})
export class TuneModule {}
