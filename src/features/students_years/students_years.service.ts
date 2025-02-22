import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentYearDto } from './dto/create-student-year.dto';
import { DeleteStudentYearDto } from './dto/delete-student-year.dto';

@Injectable()
export class StudentsYearsService {
  constructor(private readonly prisma: PrismaService) {}

  async addStudentToYear(data: CreateStudentYearDto) {
    return await this.prisma.students_Years.create({ data });
  }

  async removeStudentFromYear(data: DeleteStudentYearDto) {
    const record = await this.prisma.students_Years.findFirst({
      where: { 
        idEdt: data.idEdt, 
        idSchool: data.idSchool },
    });

    if (!record) throw new NotFoundException('Association non trouvée.');

    return await this.prisma.students_Years.delete({ where: { id: record.id } });
  }
}
