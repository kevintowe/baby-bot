import { Module, DynamicModule, Global } from '@nestjs/common';
import { Twilio } from 'twilio';
import { TwilioWebhookGuard } from './twilio-webhook.guard';

@Global()
@Module({
  providers: [TwilioWebhookGuard],
  exports: ['TWILIO_CLIENT', TwilioWebhookGuard],
})
export class TwilioClientModule {
  static forRoot(accountSid: string, authToken: string): DynamicModule {
    const client = new Twilio(accountSid, authToken);
    return {
      module: TwilioClientModule,
      providers: [
        {
          provide: 'TWILIO_CLIENT',
          useValue: client,
        },
      ],
      exports: ['TWILIO_CLIENT'],
    };
  }
}
