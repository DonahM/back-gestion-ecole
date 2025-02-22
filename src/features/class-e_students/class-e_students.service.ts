import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassEStudentDto } from './dto/create-classE-student.dto';
import { DeleteClassEStudentDto } from './dto/delete-classE-student.dto';

@Injectable()
export class ClassEStudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async addStudentToClass(data: CreateClassEStudentDto) {
    return await this.prisma.classE_Students.create({ data });
  }

  async removeStudentFromClass(data: DeleteClassEStudentDto) {
    const record = await this.prisma.classE_Students.findFirst({
      where: {
        idCls: data.idCls,
        idEdt: data.idEdt,
      },
    });

    if (!record) throw new NotFoundException('Association non trouvée.');

    return await this.prisma.classE_Students.delete({
      where: { id: record.id },
    });
  }

  async getStudentsByClass(idCls: number) {
    return await this.prisma.classE_Students.findMany({
      where: { idCls },
      include: { etudiants: true },
    });
  }

  async getClassesByStudent(idEdt: number) {
    return await this.prisma.classE_Students.findMany({
      where: { idEdt },
      include: { classE: true },
    });
  }
}
