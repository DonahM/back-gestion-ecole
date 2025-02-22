import { Module } from '@nestjs/common';
import { ClassEYearsController } from './class-e_years.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ClassEYearsService } from './class-e_years.service';

@Module({
    controllers: [ClassEYearsController],
  providers: [ClassEYearsService, PrismaService],
})
export class ClassEYearsModule {}
