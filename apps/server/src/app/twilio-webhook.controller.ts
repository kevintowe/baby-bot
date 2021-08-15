import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AppService } from "./app.service";

const accountSid = 'AC1a840fe60f69326cfc713eaa4053a9ad';
const authToken = '9da262e8d5b97e1752f9bf8cee9f2bf5';
const babyBotNumber = '+19722174871';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const client = require('twilio')(accountSid, authToken);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const VoiceResponse = require('twilio').twiml.VoiceResponse;

@Controller('twilio')
export class TwilioWebhookController {
  constructor(private appService: AppService) {
    return;
  }

  @Post('sms')
  twilioWebhook(@Req() request: Request) {
    const body = request.body as any;
    const fromNumber = body.From ;
    console.log(`Incoming Text from : ${fromNumber}`);

    if (this.appService.isRegisteredNumber(fromNumber)) {
      // send them the help text.
      return;
    }

    client.messages.create({
      body: `The baby hasn't been born yet!!!`,
      from: babyBotNumber,
      to: fromNumber
    })
    return;
  }

  @Post('voice')
  twilioVoice(@Req() request: Request, @Res() response: Response) {
    console.log(request.body);
    const twiml = new VoiceResponse();

    twiml.say(`Hi I am baby Tau, still in the womb right now. I'll call you when I learn to talk. hash tag best baby tau.`);
    response.writeHead(200, {'Content-Type': 'text/xml'})
    response.end(twiml.toString());
  }
}