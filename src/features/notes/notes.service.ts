import { HttpStatus, Injectable } from '@nestjs/common';
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
    
      // async create(dto: CreateNotesDto): Promise<notes | HttpException> {
      //   try {
      //     // Vérifier les entrées obligatoires
      //     if (!dto.note || !dto.coefficient || !dto.idEdt || !dto.idMat || !dto.idSem || !dto.idSchool) {
      //       throw new HttpException('Tous les champs sont requis', HttpStatus.BAD_REQUEST);
      //     }
      
      //     // Vérification du semestre
      //     const semestre = await this.prismaService.semestre.findUnique({
      //       where: { idSem: dto.idSem }
      //     });
      //     if (!semestre) {
      //       throw new HttpException(`Semestre introuvable pour idSem: ${dto.idSem}`, HttpStatus.NOT_FOUND);
      //     }
      
      //     // Vérification de l'étudiant
      //     const etudiant = await this.prismaService.etudiants.findUnique({
      //       where: { idEdt: dto.idEdt }
      //     });
      //     if (!etudiant) {
      //       throw new HttpException(`Étudiant introuvable pour idEdt: ${dto.idEdt}`, HttpStatus.NOT_FOUND);
      //     }
      
      //     // Vérification de la matière
      //     const matiere = await this.prismaService.matieres.findUnique({
      //       where: { idMat: dto.idMat }
      //     });
      //     if (!matiere) {
      //       throw new HttpException(`Matière introuvable pour idMat: ${dto.idMat}`, HttpStatus.NOT_FOUND);
      //     }
      
      //     // Création de la note
      //     const db = await this.prismaService.notes.create({
      //       data: {
      //         note: dto.note,
      //         coefficient: dto.coefficient,
      //         etudiants: { connect: { idEdt: dto.idEdt } },
      //         matieres: { connect: { idMat: dto.idMat } },
      //         years_schools: { connect: { idSchool: dto.idSchool } },
      //         semestre: { connect: { idSem: dto.idSem } },
      //         classE: { connect: { idCls: dto.idCls } },
      //       }
      //     });
      
      //     return db;
      //   } catch (error) {
      //     console.error('Error:', error);
      //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      //   }
      // }
      
      
      async create(dto: CreateNotesDto): Promise<notes> {
    try {
      if (!dto.note || !dto.coefficient || !dto.idEdt || !dto.idMat || !dto.idSem || !dto.idSchool) {
        throw new HttpException('Tous les champs sont requis', HttpStatus.BAD_REQUEST);
      }

      const existingNote = await this.prismaService.notes.findFirst({
        where: { idEdt: dto.idEdt, idMat: dto.idMat, idSem: dto.idSem },
      });
      if (existingNote) {
        throw new HttpException('Note existante pour cet étudiant, matière et semestre', HttpStatus.CONFLICT);
      }

      return this.prismaService.notes.create({
        data: {
          note: dto.note,
          coefficient: dto.coefficient,
          etudiants: { connect: { idEdt: dto.idEdt } },
          matieres: { connect: { idMat: dto.idMat } },
          years_schools: { connect: { idSchool: dto.idSchool } },
          semestre: { connect: { idSem: dto.idSem } },
          classE: { connect: { idCls: dto.idCls } },
        },
      });
    } catch (error) {
      console.error('Error:', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
