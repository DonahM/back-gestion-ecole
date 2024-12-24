import { Injectable } from '@nestjs/common';
import { HttpException} from '@nestjs/common';
import { CreateSalairesDto } from './dto/create-salaires.dto';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { salaires} from '@prisma/client';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class SalairesService {
    constructor(private prismaService: PrismaService) {}
  async create(
    createSalairesDto: CreateSalairesDto,
  ): Promise<salaires | HttpException> {
    try {
      const salaires = await this.prismaService.salaires.create({
        data: {
          mois: createSalairesDto.mois,
          statut: createSalairesDto.statut,
          valeur: createSalairesDto.valeur,
          date: createSalairesDto.date,
          idProf: createSalairesDto.idProf,
          idSchool: createSalairesDto.idSchool
        },
      });
      return salaires;
    } catch (error) {
      throw exception(error);
    }
  }

  async findAll() {
    try {
      const salaires = await this.prismaService.salaires.findMany(
        {}
      );
      return salaires;
    } catch (error) {
      throw exception(error);
    }
  }

  async findOne(idSal: number) {
    try {
      const salaires = await this.prismaService.salaires.findUniqueOrThrow({
        where: {
          idSal: idSal,
        },
      });
      return salaires;
    } catch (error) {
      throw exception(error);
    }
  }

  async remove(idSal: number) {
    try {
      const res = await this.prismaService.salaires.delete({
        where: {
          idSal: idSal,
        },
      });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }

  async count(): Promise<number> {
    try {
      const res = await this.prismaService.salaires.count();
      return res;
    } catch (error) {
      throw exception(error);
    }
  }
}
