import { DynamicModule, Module } from '@nestjs/common';
import { Twilio } from 'twilio';

import { DatabaseModule } from './database.module';
import { AppController } from './app.controller';
import { TwilioWebhookController } from './twilio-webhook.controller';
import { AppService } from './app.service';
import { Config } from '../main';

@Module({
  imports: [DatabaseModule.forRoot()],
  controllers: [AppController, TwilioWebhookController],
  providers: [AppService],
})
export class AppModule {
  static forRoot(config: Config): DynamicModule {
    return {
      module: AppModule,
      providers: [
        {
          provide: 'CONFIG',
          useValue: config,
        },
        {
          provide: 'TWILIO_CLIENT',
          useFactory: (config: Config) => {
            const twilioClient = new Twilio(
              config.twilioAccountSid,
              config.twilioAuthToken
            );
            return twilioClient;
          },
          inject: ['CONFIG'],
        },
      ],
    };
  }
}
