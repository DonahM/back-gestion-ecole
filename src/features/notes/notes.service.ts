import { Injectable } from '@nestjs/common';
import { HttpException} from '@nestjs/common';
import { notes } from '@prisma/client';
import { join } from 'path';
import { PrismaService } from 'src/features/prisma/prisma.service';
import * as fs from 'fs';
import { CreateNotesDto  } from './dto/create-notes.dto';
import exception from 'src/core/errors/error_handler';
// import { UpdateEtudiantsDto } from './dto/update-etudiants.dto';

@Injectable()
export class NotesService {
    constructor(
        private prismaService: PrismaService,
        // private tagHasBddService: TagHasBddService,
      ) {}

      async fetchDatabases(
        enablePagination: boolean,
        page: number,
        itemsPerPage?: number,
      ): Promise<notes[] | null> {
        if (!enablePagination) {
          return this.prismaService.notes.findMany({
            include: {
              etudiants:true,
              matieres: true,
              semestre: true
            },
          });
        }
        return this.prismaService.notes.findMany({
          skip: (page - 1) * (itemsPerPage ?? 10),
          take: itemsPerPage ?? 10,
          include: {
            etudiants:true,
            matieres: true,
            semestre: true
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
        dto: CreateNotesDto,
      ): Promise<notes | HttpException> {
        try {
          const db = await this.prismaService.notes.create({
            data: {
              note: dto.note,
              coefficient: dto.coefficient,
              idEdt: dto.idEdt,
              idMat: dto.idMat,
              idSchool: dto.idSchool,
              idSem: dto.idSem
            },
          });
          return db;
        } catch (error) {
          throw exception(error);
        }
      }
    
      async findAll() {
        try {
          const notes = await this.prismaService.notes.findMany(
            {
            }
          );
          return notes;
        } catch (error) {
          throw exception(error);
        }
      }
    
      async findByEtudiants(idMat: number): Promise<notes[]> {
        try {
          const notes = await this.prismaService.notes.findMany({
            where: {
              idMat: {
                equals: idMat,
              },
            },
            include: {
              matieres: true,
            },
          });
          return notes;
        } catch (error) {
          throw exception(error);
        }
      }
    
    
      async findOne(idNot: number) {
        try {
          const notes = await this.prismaService.notes.findUniqueOrThrow({
            where: {
              idNot: idNot,
            },
            include: {
              matieres: true, // Assure-toi que la relation est bien incluse
            },
          });
          return notes;
        } catch (error) {
          throw exception(error);
        }
      }

    //   async update(
    //     idNot: number,
    //     updateEtudiantsDto: UpdateEtudiantsDto,
    //     image?: string,
    //   ): Promise<etudiants | HttpException> {
    //     try {
    //       const updatedEtudiants = await this.prismaService.etudiants.update({
    //         where: {
    //           idNot: idNot,
    //         },
    //         data: {
    //           name: updateEtudiantsDto.name,
    //           surname: updateEtudiantsDto.surname,
    //           date_naiss: updateEtudiantsDto.date_naiss,
    //           lieu_naiss: updateEtudiantsDto.lieu_naiss,
    //           sexe: updateEtudiantsDto.sexe,
    //           tel: updateEtudiantsDto.tel,
    //           adress_edt: updateEtudiantsDto.adress_edt,
    //           father: updateEtudiantsDto.father,
    //         },
    //       });
    //       return updatedEtudiants;
    //     } catch (error) {
    //       throw exception(error);
    //     }
    //   }

      async remove(idNot: number): Promise<notes | unknown> {
        try {
          const res = await this.prismaService.notes.delete({
            where: {
              idNot: idNot,
            },
          });
          return res;
        } catch (error) {
          throw exception(error);
        }
      }
    
      async count(): Promise<number> {
        try {
          const res = await this.prismaService.notes.count();
          return res;
        } catch (error) {
          throw exception(error);
        }
      }
}
