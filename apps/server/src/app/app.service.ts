import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

export interface RegisteredUser {
  number: string;
  uid?: string;
  name?: string;
}


@Injectable()
export class AppService {

  private registeredUsers = new BehaviorSubject<{[key: string]: RegisteredUser}>(null);
  
  getData(): { message: string } {
    return { message: 'Welcome to server!' };
  }

  isRegisteredNumber(phoneNumber: string): boolean {
    const keys = Object.keys(this.registeredUsers.value);
    let isUser = false;

    keys.forEach((key) => {
      if(key === phoneNumber) isUser = true
    })
    
    return isUser;
  }
}
