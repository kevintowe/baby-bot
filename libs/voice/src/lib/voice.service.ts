import { Inject, Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class VoiceService {
  constructor(@Inject('TWILIO_CLIENT') private client: Twilio) {}

  notifyParentsOfCall(fromNumber: string) {
    this.client.messages.create({
      body: `${fromNumber} called baby bot.`,
      from: '',
      // from: this.config.babyBotNumber,
      to: `+19723456443`,
    });
    this.client.messages.create({
      body: `${fromNumber} called baby bot.`,
      // from: this.config.babyBotNumber,
      from: '+1',
      to: `+19728217217`,
    });
  }

  isRegisteredNumber(phoneNumber: string) {
    return true;
  }

  async registerNumber(phoneNumber: string) {
    return;
  }

  sendWelcomeText(fromNumber) {
    // this.client.messages.create({
    //   body: `Hi I'm baby Towe!`,
    //   from: this.config.babyBotNumber,
    //   to: fromNumber,
    // });
  }

  getVoiceGreeting() {
    return '';
  }
}
