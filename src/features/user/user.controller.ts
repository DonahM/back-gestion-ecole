// import { Magasin as User, Magasin } from '@prisma/client';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  // UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { EmailVerificationCode } from 'src/core/models/email_verification_code';
// import { MagasinModel } from 'src/core/models/user_model';
import { FileInterceptor } from '@nestjs/platform-express';
// import UploadFileUsecase from 'src/core/usecases/upload_file_usecase';
import { SendNotificationDto } from './dto/send_notification_dto';
import { SendWelcomeMailDto } from './dto/send_welcome_mail_dto';
import { ResetPasswordDto } from './dto/reset_password_dto';
import { ResendPasswordDto } from './dto/resend_password_dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[],
  ): Omit<User, Key> {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key as Key)),
    ) as Omit<User, Key>;
  }

  @Post()
  async create(@Body() dto: UserDto) {
    return this.service.createUser(dto)
  }

  @Get()
  findAll(){
    return this.service.findAll()
  }

  @Get(':id')
  findOne(@Param('id') idUser: number) {
    return this.service.findOne(idUser);
  }


 

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') idUser: number,
    @Body() dto: UserDto,
    // @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return this.service.update(idUser, dto);
    } catch (error) {
      return this.service.update(idUser, dto);
    }
  }
}
