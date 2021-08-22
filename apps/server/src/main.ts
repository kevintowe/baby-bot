import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

export interface Config {
  twilioAccountSid: string;
  twilioAuthToken: string;
  babyBotNumber: string;
}

const TWILIO_ACCOUNT_SID = 'AC1a840fe60f69326cfc713eaa4053a9ad';
const TWILIO_AUTH_TOKEN = '9da262e8d5b97e1752f9bf8cee9f2bf5';
const BABY_BOT_NUMBER = '+19722174871';

const CONFIG: Config = {
  twilioAccountSid: TWILIO_ACCOUNT_SID,
  twilioAuthToken: TWILIO_AUTH_TOKEN,
  babyBotNumber: BABY_BOT_NUMBER,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot(CONFIG));
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port);
  });
}

bootstrap();
