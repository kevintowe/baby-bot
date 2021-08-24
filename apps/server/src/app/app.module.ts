import { DynamicModule, Module } from '@nestjs/common';

import { AppBootConfig } from '@baby-bot/types';
import { DatabaseModule } from '@baby-bot/database';
import { TwilioClientModule } from '@baby-bot/twilio-client';
import { VoiceModule } from '@baby-bot/voice';
import { SmsModule } from '@baby-bot/sms';

import { TwilioWebhookController } from './twilio-webhook.controller';
import { AppService } from './app.service';

@Module({
  imports: [VoiceModule, SmsModule],
  controllers: [TwilioWebhookController],
  providers: [AppService],
})
export class AppModule {
  static forRoot(config: AppBootConfig): DynamicModule {
    return {
      module: AppModule,
      imports: [
        DatabaseModule.forRoot(),
        TwilioClientModule.forRoot(
          config.twilioAccountSid,
          config.twilioAuthToken
        ),
      ],
      providers: [
        {
          provide: 'CONFIG',
          useValue: config,
        },
      ],
    };
  }
}
