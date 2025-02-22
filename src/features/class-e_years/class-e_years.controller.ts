import { Controller, Post, Delete, Body, Get } from '@nestjs/common';
import { ClassEYearsService } from './class-e_years.service';
import { CreateClassEYearDto } from './dto/create-classE-year.dto';
import { DeleteClassEYearDto } from './dto/delete-classE-year.dto';

@Controller('class-e-years')
export class ClassEYearsController {
    constructor(private readonly classEYearsService: ClassEYearsService) {}

  @Post()
  async addClassToYear(@Body() data: CreateClassEYearDto) {
    return this.classEYearsService.addClassToYear(data);
  }

  @Delete()
  async removeClassFromYear(@Body() data: DeleteClassEYearDto) {
    return this.classEYearsService.removeClassFromYear(data);
  }

  @Get()
  findAll(){
    return this.classEYearsService.findAll()
  }
}
