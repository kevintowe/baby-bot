import { DynamicModule, Module } from '@nestjs/common';

import { Twilio } from 'twilio';

import { PhoneNumberProvisioningConfig } from '../main';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static forRoot(config: PhoneNumberProvisioningConfig): DynamicModule {
    return {
      module: AppModule,
      providers: [
        {
          provide: 'TWILIO_CLIENT',
          useValue: new Twilio(config.twilioAccountSid, config.twilioAuthToken),
        },
      ],
    };
  }
}
