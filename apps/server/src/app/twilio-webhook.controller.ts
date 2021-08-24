import { Controller, Inject, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Twilio } from 'twilio';

import { AppBootConfig } from '@baby-bot/types';
import { AppService } from './app.service';

@Controller('twilio')
export class TwilioWebhookController {
  constructor(
    private appService: AppService,
    @Inject('TWILIO_CLIENT') private client: Twilio,
    @Inject('CONFIG') private config: AppBootConfig
  ) {
    return;
  }

  @Post('sms')
  async twilioWebhook(@Req() request: Request) {
    const body = request.body as any;
    const fromNumber = body.From;
    console.log(body);
    const smsBody = body.Body;
    console.log(`Incoming Text from : ${fromNumber}`);

    this.client.messages.create({
      body: `${fromNumber} sent the message "${smsBody}"`,
      from: this.config.babyBotNumber,
      to: `+19723456443`,
    });
    this.client.messages.create({
      body: `${fromNumber} sent the message "${smsBody}"`,
      from: this.config.babyBotNumber,
      to: `+19728217217`,
    });

    const registeredUser = this.appService.isRegisteredNumber(fromNumber);
    console.log(registeredUser);

    // check if sender is Kevin or Natalie
    if (fromNumber === '+19723456443' || fromNumber === '+19728217217') {
      console.log('The sender was Kevin or Natalie. Super User');
      const isMedia = body.MediaUrl0;
      console.log(`There is media: ${isMedia}`);
      // send received media to the active phone user list
      if (isMedia) {
        const mediaUrl = body.MediaUrl0;
        const userList = this.appService.getPhoneUserList();
        userList.forEach((user) => {
          this.client.messages.create({
            body: smsBody,
            from: this.config.babyBotNumber,
            to: user,
            mediaUrl: [mediaUrl],
          });
        });
      }
      // check if message all
      const lowerCaseBod = smsBody.toLowerCase();
      const messageToSend = smsBody.substring(11);
      if (lowerCaseBod.includes('message all')) {
        this.appService.getPhoneUserList().forEach((user) => {
          this.client.messages.create({
            body: messageToSend,
            from: this.config.babyBotNumber,
            to: user,
          });
        });
      }
      // special update commands
      if (lowerCaseBod.includes('update primary greeting')) {
        await this.appService.updatePrimaryGreeting(smsBody.substring(24));
        this.client.messages.create({
          body: 'Successfully updated primary greeting.',
          from: this.config.babyBotNumber,
          to: fromNumber,
        });
      }
      if (lowerCaseBod.includes('update voice greeting')) {
        const newGreeting = smsBody.substring(21);
        await this.appService.updateVoiceGreeting(newGreeting);
        this.client.messages.create({
          body: `Successfully updated primary voice greeting to: ${newGreeting}`,
          from: this.config.babyBotNumber,
          to: fromNumber,
        });
      }
      // send to specific number from baby-bot
      if (lowerCaseBod.includes('message55')) {
        const message = smsBody.substring(9);
        this.client.messages.create({
          body: message,
          from: this.config.babyBotNumber,
          to: fromNumber,
        });
      }
    }

    if (registeredUser) {
      // send them the help text.
      if (smsBody === '99') {
        // canbcel
        await this.appService.deleteUser(fromNumber);
        this.client.messages.create({
          body: `You're no longer talking to baby towe :(`,
          from: this.config.babyBotNumber,
          to: fromNumber,
        });
      } else if (smsBody === '22') {
        // help
        this.client.messages.create({
          body: `This isn't ready yet:(`,
          from: this.config.babyBotNumber,
          to: fromNumber,
        });
      } else {
        this.client.messages.create({
          body: this.appService.getPrimaryGreeting(),
          // body: `Still in the womb! I'm not ready to come out yet! We are waiting on a call from the doctor to go to the hospital!!!`,
          from: this.config.babyBotNumber,
          to: fromNumber,
        });
      }
    } else {
      await this.appService.registerUser(fromNumber);
      this.client.messages.create({
        body: `Hi I'm Baby Towe! Text for updates on my arrival!`,
        from: this.config.babyBotNumber,
        to: fromNumber,
      });
    }
  }
}
