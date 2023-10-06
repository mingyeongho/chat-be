import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LoginValidPipe implements PipeTransform {
  transform(value: LoginDto) {
    const { email, password } = value;

    // email validation
    const emailRegex =
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('이메일 형식이 맞지 않습니다.');
    }

    // password validation
    const passwordRegex = /^[A-Za-z0-9]{6,13}$/;
    if (!passwordRegex.test(password)) {
      throw new BadRequestException('비밀번호 형식이 맞지 않습니다.');
    }

    return value;
  }
}
