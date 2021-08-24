import { Module } from '@nestjs/common';
import { TwilioClientModule } from '@baby-bot/twilio-client';

import { VoiceController } from './voice.controller';
import { VoiceService } from './voice.service';

@Module({
  imports: [],
  controllers: [VoiceController],
  providers: [VoiceService],
})
export class VoiceModule {}
