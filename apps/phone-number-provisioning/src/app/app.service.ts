import { Inject, Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class AppService {
  constructor(@Inject('TWILIO_CLIENT') private twilioClient: Twilio) {
    this.searchForAvailablePhoneNumbers(512);
  }

  searchForAvailablePhoneNumbers(areaCode: number) {
    this.twilioClient
      .availablePhoneNumbers('US')
      .local.list({ areaCode, limit: 20 })
      .then((local) => {
        local.forEach((l) => {
          console.log(l.friendlyName);
        });
      });
  }

  purchasePhoneNumber(phoneNumber: string) {
    this.twilioClient.incomingPhoneNumbers.create({
      phoneNumber,
      smsApplicationSid: '',
      voiceApplicationSid: '',
    });
    return;
  }
}
