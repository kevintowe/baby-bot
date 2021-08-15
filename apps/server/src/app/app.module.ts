import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import {  TwilioWebhookController } from './twilio-webhook.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, TwilioWebhookController],
  providers: [AppService],
})
export class AppModule {}
