import { Injectable } from '@nestjs/common';
import { HttpException} from '@nestjs/common';
import { CreateProfesseursDto} from './dto/create-professeurs.dto';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { professeurs} from '@prisma/client';
import exception from 'src/core/errors/error_handler';
@Injectable()
export class ProfesseursService {
    constructor(private prismaService: PrismaService) {}
  async create(
    createProffresseursDto: CreateProfesseursDto,
  ): Promise<professeurs | HttpException> {
    try {
      const proffesseurs = await this.prismaService.professeurs.create({
        data: {
          name: createProffresseursDto.name,
          surname: createProffresseursDto.surname,
          matiere: createProffresseursDto.matiere,
          idSchool: createProffresseursDto.idSchool
        },
      });
      return proffesseurs;
    } catch (error) {
      throw exception(error);
    }
  }

  async findAll() {
    try {
      const proff = await this.prismaService.professeurs.findMany(
        {
          include:{
            salaires:true
          },
        }
      );
      return proff;
    } catch (error) {
      throw exception(error);
    }
  }

  async findOne(idProf: number) {
    try {
      const proff = await this.prismaService.professeurs.findUniqueOrThrow({
        where: {
          idProf: idProf,
        },
      });
      return proff;
    } catch (error) {
      throw exception(error);
    }
  }

  async remove(idProf: number) {
    try {
      const res = await this.prismaService.professeurs.delete({
        where: {
          idProf: idProf,
        },
      });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }

  async count(): Promise<number> {
    try {
      const res = await this.prismaService.professeurs.count();
      return res;
    } catch (error) {
      throw exception(error);
    }
  }
}
