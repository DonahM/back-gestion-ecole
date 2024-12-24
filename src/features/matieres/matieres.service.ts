import { HttpException, Injectable } from '@nestjs/common';
import { CreateMatieresDto } from './dto/create-matieres.dto';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { matieres} from '@prisma/client';
import exception from 'src/core/errors/error_handler';
@Injectable()
export class MatieresService {
    constructor(private prismaService: PrismaService) {}
  async create(
    createMatieresDto: CreateMatieresDto,
  ): Promise<matieres | HttpException> {
    try {
      const matieres = await this.prismaService.matieres.create({
        data: {
          name: createMatieresDto.name,
          idEdt: createMatieresDto.idEdt,
          idSchool: createMatieresDto.idSchool
        },
      });
      return matieres;
    } catch (error) {
      throw exception(error);
    }
  }

  async findAll() {
    try {
      const matieres = await this.prismaService.matieres.findMany(
        {
          include:{
            notes:true,
          },
        }
      );
      return matieres;
    } catch (error) {
      throw exception(error);
    }
  }

  async findOne(idMat: number) {
    try {
      const matieres = await this.prismaService.matieres.findUniqueOrThrow({
        where: {
          idMat: idMat,
        },
      });
      return matieres;
    } catch (error) {
      throw exception(error);
    }
  }

  async remove(idMat: number) {
    try {
      const res = await this.prismaService.matieres.delete({
        where: {
          idMat: idMat,
        },
      });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }

  async count(): Promise<number> {
    try {
      const res = await this.prismaService.matieres.count();
      return res;
    } catch (error) {
      throw exception(error);
    }
  }
}
