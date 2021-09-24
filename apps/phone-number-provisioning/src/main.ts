/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

export interface PhoneNumberProvisioningConfig {
  twilioAccountSid: string;
  twilioAuthToken: string;
}

const config: PhoneNumberProvisioningConfig = {
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot(config));

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port);
  });
}

bootstrap();
