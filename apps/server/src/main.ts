import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

export interface Config {
  twilioAccountSid: string;
  twilioAuthToken: string;
  babyBotNumber: string;
}

const CONFIG: Config = {
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  babyBotNumber: process.env.BABY_BOT_NUMBER,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot(CONFIG));
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port);
  });
}

bootstrap();
