import { UserService } from './user.service';
import { Body, Controller, Get, HttpException, Param, Patch, Post, UseInterceptors, BadRequestException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResetPasswordDto } from './dto/reset_password_dto';
import { ResendPasswordDto } from './dto/resend_password_dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  exclude<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key as Key)),
    ) as Omit<User, Key>;
  }

  @Post()
  async create(@Body() dto: UserDto) {
    try {
      const newUser = await this.service.createUser(dto);
      return newUser;
    } catch (error) {
      throw new HttpException(error.response || error.message, error.status || 500);
    }
  }
  @Get()
  async findAll() {
    try {
      const users = await this.service.findAll();
      return users;
    } catch (error) {
      throw new HttpException(error.response || error.message, error.status || 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') idUser: number) {
    try {
      const user = await this.service.findOne(idUser);
      return user;
    } catch (error) {
      throw new HttpException(error.response || error.message, error.status || 500);
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') idUser: number,
    @Body() dto: UserDto,
  ) {
    try {
      const updatedUser = await this.service.update(idUser, dto);
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.response || error.message, error.status || 500);
    }
  }

  @Patch(':id/reset-password')
  async resetPassword(
    @Param('id') idUser: number,
    @Body() dto: ResetPasswordDto,
  ) {
    try {
      const updatedUser = await this.service.resetPassword(idUser, dto);
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.response || error.message, error.status || 500);
    }
  }

  @Post('resend-password')
  async resendPassword(@Body() dto: ResendPasswordDto) {
    try {
      const randomPassword = await this.service.resendPassword(dto);
      return { password: randomPassword };
    } catch (error) {
      throw new HttpException(error.response || error.message, error.status || 500);
    }
  }
}
