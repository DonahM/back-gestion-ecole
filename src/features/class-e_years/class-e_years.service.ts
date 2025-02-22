import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassEYearDto } from './dto/create-classE-year.dto';
import { DeleteClassEYearDto } from './dto/delete-classE-year.dto';
import exception from 'src/core/errors/error_handler';

@Injectable()
export class ClassEYearsService {
  constructor(private readonly prisma: PrismaService) {}

  async addClassToYear(data: CreateClassEYearDto) {
    return await this.prisma.classE_Years.create({ data });
  }

  async removeClassFromYear(data: DeleteClassEYearDto) {
    const record = await this.prisma.classE_Years.findFirst({
      where: { idCls: data.idCls, idSchool: data.idSchool },
    });

    if (!record) throw new NotFoundException('Association non trouvée.');

    return await this.prisma.classE_Years.delete({ where: { id: record.id } });
  }

  async findAll() {
    try {
      const classes = await this.prisma.classE.findMany(
        {}
      );
      return classes;
    } catch (error) {
      throw exception(error);
    }
  }
}
