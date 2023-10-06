import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.input';

export class SignUpValidPipe
  implements PipeTransform<CreateUserDto, CreateUserDto>
{
  transform(value: CreateUserDto) {
    const { email, kakaoId, name, password, phone } = value;

    // email validation
    const emailRegex =
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('이메일 형식이 맞지 않습니다.');
    }

    // kakaoId validation
    const kakaoIdRegex = /^[A-Za-z0-9]{2,13}$/;
    if (!kakaoIdRegex.test(kakaoId)) {
      throw new BadRequestException('카카오 아이디 형식이 맞지 않습니다.');
    }

    // name validation
    const nameRegex = /^[A-Za-z가-힣]{2,18}$/;
    if (!nameRegex.test(name)) {
      throw new BadRequestException('이름 형식이 맞지 않습니다.');
    }

    // password validation
    const passwordRegex = /^[A-Za-z0-9]{6,13}$/;
    if (!passwordRegex.test(password)) {
      throw new BadRequestException('비밀번호 형식이 맞지 않습니다.');
    }

    // phone validation
    // init phone - 010-1234-1234
    // result phone - +821012341234
    const initPhoneRegex = /^(\d{3}-\d{4}-\d{4})$/;
    if (!initPhoneRegex.test(phone)) {
      throw new BadRequestException('핸드폰 형식이 맞지 않습니다.');
    }
    const nationCode = {
      korea: '+82',
    };
    const cleanedPhone = phone.replace(/-/g, '');
    const formattedPhone = `${nationCode.korea}${+cleanedPhone}`;

    return {
      ...value,
      phone: formattedPhone,
    };
  }
}
