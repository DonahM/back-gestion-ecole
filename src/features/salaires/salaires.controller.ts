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
import { SalairesService } from './salaires.service';
import { CreateSalairesDto } from './dto/create-salaires.dto';

@Controller('salaires')
export class SalairesController {
    constructor(private readonly salairesService: SalairesService) {}

  @Post()
  async create(@Body() dto: CreateSalairesDto) {
    return this.salairesService.create(dto)
  }

  @Get()
  findAll(){
    return this.salairesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') idCls: string) {
    return this.salairesService.findOne(+idCls);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  
  

  @Delete(':id')
  async remove(@Param('id') idCls: string) {
    return this.salairesService.remove(+idCls);
  }

  @Get('/count')
  async count(): Promise<number> {
    return this.salairesService.count();
  }
}
