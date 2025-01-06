import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { Magasin } from '@prisma/client';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { user } from '@prisma/client';
import * as argon2 from 'argon2';
import exception from 'src/core/errors/error_handler';
import { ResetPasswordDto } from './dto/reset_password_dto';
import { ResendPasswordDto } from './dto/resend_password_dto';
import { generateRandomPassword } from 'src/core/helpers/random_password';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async createUser(
    dto: UserDto,
  ): Promise<user | HttpException> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          email: dto.email,
        },
      });
      console.log(dto.email);
      if (user != null) {
        throw new HttpException(
          {
            message: `user already exist`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await argon2.hash(dto.password);
      // const rolesAsString: string = dto.roles.join(' ');
      const rolesAsString = dto.roles.join(', ');
      const res = await this.prismaService.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          surname:dto.surname,
          cin:dto.cin,
          roles: rolesAsString, 
          logo:dto.logo,
          lieu: dto.lieu,
          password: hashedPassword,
        }
      });
      return user
    } catch (error) {
      throw error;
    }
  }

  async findOne(idUser: number): Promise<user> {
    try {
      const user = await this.prismaService.user.findFirstOrThrow({
        where: {
          idUser: idUser,
        },
      });
      return user
    } catch (error) {
      throw exception(error);
    }
  }

  async findAll(): Promise<user> {
    try {
      const user = await this.prismaService.user.findFirstOrThrow({
        
      });
      return user
    } catch (error) {
      throw exception(error);
    }
  }

  async resetPassword(idUser: number, dto: ResetPasswordDto){
    const user = await this.prismaService.user.findUnique({
      where: {
          idUser:idUser,
      }
    })

    if(!user) throw new BadRequestException('User does\'t esxist')
    const validPassword = await argon2.verify(user.password, dto.actualPassword);
    if(!validPassword) throw new BadRequestException('Password does\'t match the actual password')

    const hashedPassword = await argon2.hash(dto.newPassword);

    const update = await this.prismaService.user.update({
      where: {
        idUser:idUser,
      },
      data: {
        password: hashedPassword
      }
    })
    return update;
  }

  async resendPassword(dto: ResendPasswordDto){    
    const user = await this.prismaService.user.findFirst({
      where: {
        email: dto.email
      }
    })

    if(!user) throw new BadRequestException('User does\'t esxist')

    const randomPasswd = generateRandomPassword();

    const hashedPassword = await argon2.hash(randomPasswd);

    await this.prismaService.user.update({
      where: {
        idUser: user.idUser
      },
      data: {
        password: hashedPassword
      }
    });
    return randomPasswd;
  }

  async update(idUser: number, dto: UserDto) {
    try {
      const data: any = {};
      if (dto.email != null) {
        data.email = dto.email;
      }
      if (dto.name != null) {
        data.name = dto.name;
      }
      if (dto.roles != null) {
        data.roles = dto.roles;
      }
      if (dto.surname != null) {
        data.surname = dto.surname;
      }
      const user = await this.prismaService.user.update({
        data: {
          ...data,
        },
        where: {
          idUser: idUser,
        },
      });
      return user;
    } catch (error) {
      throw exception(error);
    }
  }
}
