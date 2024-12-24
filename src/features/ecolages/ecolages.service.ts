import { Injectable } from '@nestjs/common';
import { HttpException} from '@nestjs/common';
import { CreateEcolagesDto } from './dto/create-ecolages.dto';
import { PrismaService } from 'src/features/prisma/prisma.service';
import { ecolages} from '@prisma/client';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class EcolagesService {
    constructor(private prismaService: PrismaService) {}
  async create(
    createEcolagesDto: CreateEcolagesDto,
  ): Promise<ecolages | HttpException> {
    try {
      const ecolages = await this.prismaService.ecolages.create({
        data: {
          mois: createEcolagesDto.mois,
          statut: createEcolagesDto.statut,
          valeur: createEcolagesDto.valeur,
          date: createEcolagesDto.date,
          idEdt: createEcolagesDto.idEdt,
          idSchool: createEcolagesDto.idSchool
        },
      });
      return ecolages;
    } catch (error) {
      throw exception(error);
    }
  }

  async findAll() {
    try {
      const ecolages = await this.prismaService.ecolages.findMany({
        include: {
          years_schools: {
            select: {
              annee_scolaire: true, // Inclure l'année scolaire
            },
          },
        },
      });
      return ecolages;
    } catch (error) {
      throw exception(error);
    }
  }
  

  async findOne(idEco: number) {
    try {
      const ecolages = await this.prismaService.ecolages.findUniqueOrThrow({
        where: {
          idEco: idEco,
        },
        include: {
          etudiants: true // Assure-toi que la relation est bien incluse
        },
      });
      return ecolages;
    } catch (error) {
      throw exception(error);
    }
  }

  async remove(idEco: number) {
    try {
      const res = await this.prismaService.ecolages.delete({
        where: {
          idEco: idEco,
        },
      });
      return res;
    } catch (error) {
      throw exception(error);
    }
  }

  async count(): Promise<number> {
    try {
      const res = await this.prismaService.ecolages.count();
      return res;
    } catch (error) {
      throw exception(error);
    }
  }
}
