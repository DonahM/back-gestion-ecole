import { Controller,   
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseInterceptors,
    UploadedFile,
    HttpException,
 } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfesseursService } from './professeurs.service';
import { CreateProfesseursDto } from './dto/create-professeurs.dto';

@Controller('professeurs')
export class ProfesseursController {
    constructor(private readonly proffesseursservice: ProfesseursService) {}

  @Post()
  async create(@Body() dto: CreateProfesseursDto) {
    return this.proffesseursservice.create(dto)
  }

  @Get()
  findAll(){
    return this.proffesseursservice.findAll()
  }

  @Get(':id')
  findOne(@Param('id') idProf: string) {
    return this.proffesseursservice.findOne(+idProf);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  
  

  @Delete(':id')
  async remove(@Param('id') idProf: string) {
    return this.proffesseursservice.remove(+idProf);
  }

  @Get('/count')
  async count(): Promise<number> {
    return this.proffesseursservice.count();
  }
}
