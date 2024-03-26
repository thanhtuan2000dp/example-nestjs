import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return { msg: 'I am signing up' };
  }

  signin() {
    return { msg: 'I am signing in' };
  }
}
