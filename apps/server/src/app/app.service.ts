import { Inject, Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

import * as admin from 'firebase-admin';

export interface PhoneUser {
  phoneNumber: string;
  id?: string;
  name?: string;
}

@Injectable()
export class AppService {
  private primaryGreetingRef = this.firestore.doc('greetings/primaryGreeting');
  private voiceGreetingRef = this.firestore.doc('greetings/voiceGreeting');

  constructor(
    @Inject('Firestore') private firestore: admin.firestore.Firestore
  ) {
    // orchistrate database subscription for the phone user list
    const query = firestore.collection('phone-users');
    const unsubscribe = query.onSnapshot((querySnapshot) => {
      const phoneUsers = {} as { [key: string]: PhoneUser };
      querySnapshot.docs.forEach((doc) => {
        const id = doc.id;
        const data = doc.data() as PhoneUser;
        const user: PhoneUser = {
          phoneNumber: data.phoneNumber,
          id: id,
          name: data.name,
        };

        phoneUsers[user.phoneNumber] = user;
      });
      this.phoneUsers.next(phoneUsers);
    });
    // then subscribe to the primary greeting
    const unsub2 = this.primaryGreetingRef.onSnapshot((docSnapshot) => {
      const greeting = docSnapshot.data() as any;
      this.primaryGreeting.next(greeting.text);
    });
    const unsub3 = this.voiceGreetingRef.onSnapshot((docSnapshot) => {
      const voiceGreeting = docSnapshot.data() as any;
      this.voiceGreeting.next(voiceGreeting.text);
    });

    this.primaryGreeting.subscribe((val) => {
      console.log(val);
    });
  }

  private phoneUsers = new BehaviorSubject<{ [key: string]: PhoneUser }>(null);
  private primaryGreeting = new BehaviorSubject<string>(null);
  private voiceGreeting = new BehaviorSubject<string>(null);

  getData(): { message: string } {
    return { message: 'Welcome to server!' };
  }

  getPhoneUserList() {
    return Object.keys(this.phoneUsers.value);
  }

  isRegisteredNumber(phoneNumber: string): boolean {
    const keys = Object.keys(this.phoneUsers.value);
    let isUser = false;

    keys.forEach((key) => {
      if (key === phoneNumber) isUser = true;
    });

    return isUser;
  }

  /**
   * User Methods
   */

  async registerUser(phoneNumber: string) {
    const document = this.firestore.collection('phone-users').doc();

    const documewntUuid = document.id;

    await document.set({
      id: documewntUuid,
      phoneNumber,
    });
  }

  async deleteUser(phoneNumber: string) {
    const id = this.phoneUsers.value[phoneNumber].id;
    await this.firestore.collection('phone-users').doc(id).delete();
  }

  /**
   * Greeting Methods
   */

  async updatePrimaryGreeting(greeting: string) {
    await this.primaryGreetingRef.update({ text: greeting });
  }
  async updateVoiceGreeting(greeting: string) {
    await this.voiceGreetingRef.update({ text: greeting });
  }

  getPrimaryGreeting() {
    return this.primaryGreeting.value;
  }
  getVoiceGreeting() {
    return this.voiceGreeting.value;
  }
}
