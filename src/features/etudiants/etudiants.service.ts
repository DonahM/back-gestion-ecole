import { Injectable } from '@nestjs/common';
import { HttpException} from '@nestjs/common';
import { etudiants } from '@prisma/client';
import { join } from 'path';
import { PrismaService } from 'src/features/prisma/prisma.service';
import * as fs from 'fs';
import { CreateEtudiantsDto } from './dto/create-etudiants.dto';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class EtudiantsService {
    constructor(
        private prismaService: PrismaService,
        // private tagHasBddService: TagHasBddService,
      ) {}

      async fetchDatabases(
        enablePagination: boolean,
        page: number,
        itemsPerPage?: number,
      ): Promise<etudiants[] | null> {
        if (!enablePagination) {
          return this.prismaService.etudiants.findMany({
            include: {
              classE: true,
            },
          });
        }
        return this.prismaService.etudiants.findMany({
          skip: (page - 1) * (itemsPerPage ?? 10),
          take: itemsPerPage ?? 10,
          include: {
            classE: true,
          },
        });
      }

      async serveFiles(dir: string): Promise<string[] | null> {
        const directoryPath = join(
          __dirname,
          '..',
          '..',
          '..',
          'public',
          'upload',
          dir,
        );
    
        if (
          !fs.existsSync(directoryPath) ||
          !fs.lstatSync(directoryPath).isDirectory()
        ) {
          return null;
        }
        const files = fs.readdirSync(directoryPath);
        return files;
      }
    
      async create(
        dto: CreateEtudiantsDto,
      ): Promise<etudiants | HttpException> {
        try {
          const db = await this.prismaService.etudiants.create({
            data: {
              name: dto.name,
              surname: dto.surname,
              age: dto.age,
              image: dto.image,
              idCls: dto.idCls
            },
          });
          return db;
        } catch (error) {
          throw exception(error);
        }
      }
    
      async findAll() {
        try {
          const etudiants = await this.prismaService.etudiants.findMany();
          return etudiants;
        } catch (error) {
          throw exception(error);
        }
      }
    
      async findByGenre(idCls: number): Promise<etudiants[]> {
        try {
          const genre = await this.prismaService.etudiants.findMany({
            where: {
              idCls: {
                equals: idCls,
              },
            },
            include: {
              classE: true,
            },
          });
          return genre;
        } catch (error) {
          throw exception(error);
        }
      }
    
    
      async remove(idEdt: number): Promise<etudiants | unknown> {
        try {
          const res = await this.prismaService.etudiants.delete({
            where: {
              idEdt: idEdt,
            },
          });
          return res;
        } catch (error) {
          throw exception(error);
        }
      }
    
      async count(): Promise<number> {
        try {
          const res = await this.prismaService.etudiants.count();
          return res;
        } catch (error) {
          throw exception(error);
        }
      }
    

}
