/**
 * When an incoming phoneNumber
 */
import { Body, Controller, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Twilio } from 'twilio';

import { TwilioWebhookGuard } from '@baby-bot/twilio-client';

import { VoiceService } from './voice.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const VoiceResponse = require('twilio').twiml.VoiceResponse;

export class VoiceWebhookDto {
  From: string;
  To: string;
}

@Controller('voice')
@UseGuards(TwilioWebhookGuard)
export class VoiceController {
  constructor(
    @Inject('TWILIO_CLIENT') private client: Twilio,
    private voiceService: VoiceService
  ) {
    return;
  }

  @Post()
  async voiceWebhook(
    @Body() voiceWebhookDto: VoiceWebhookDto,
    @Res() response: Response
  ) {
    // parse the bady and outbound phone number from the HTTP request, remember Twilio is the one calling this endpoint.
    console.log(voiceWebhookDto);
    const fromNumber = voiceWebhookDto.From;
    const toNumber = voiceWebhookDto.To;

    /**
     * Text Kevin and Natalie, notifying them of the inbound phone call to baby bot.
     */
    this.voiceService.notifyParentsOfCall(fromNumber);

    // If not a baby-bot contact, register the number.
    if (!this.voiceService.isRegisteredNumber(fromNumber)) {
      await this.voiceService.registerNumber(fromNumber);
      this.voiceService.sendWelcomeText(fromNumber);
    }

    // Get the voice greeting, and end the request.
    const twiml = new VoiceResponse();
    twiml.say(this.voiceService.getVoiceGreeting());
    response.writeHead(200, { 'Content-Type': 'text/xml' });
    response.send(twiml.toString());
  }
}
