import { Injectable } from '@angular/core';

export interface CreateUserDto {
  tel: string;
  firstName: string;
  lastName: string;
  email: string;
  primaryUseCase: {
    baby: boolean | null;
    wedding: boolean | null;
    birthday: boolean | null;
    other: string | null;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthtService {
  constructor() {
    return;
  }

  // Submit a server event which in turn sends a text message to the user given phone number
  // The text message body contains a verification code
  async sendPhoneNumberVerificationCode(
    tel: string
  ): Promise<{ success: boolean }> {
    return { success: true };
  }

  //
  async validateVerificationCode(code: string): Promise<{ success: boolean }> {
    return { success: true };
  }

  async createUser(
    createUserDto: CreateUserDto
  ): Promise<{ success: boolean }> {
    return { success: true };
  }
}
