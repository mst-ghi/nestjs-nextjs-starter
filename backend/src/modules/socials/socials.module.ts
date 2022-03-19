import { SocialsUtils } from '@app/shared/socials';
import { Module } from '@nestjs/common';
import { SocialsController } from './socials.controller';
import { SocialsService } from './socials.service';

@Module({
  controllers: [SocialsController],
  providers: [SocialsService, SocialsUtils],
})
export class SocialsModule {}
