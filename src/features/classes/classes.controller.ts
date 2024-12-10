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
import { ClassesService } from './classes.service';
import { CreateClassesDto } from './dto/create-classes.dto';

@Controller('classes')
export class ClassesController {
    constructor(private readonly depenseService: ClassesService) {}

  @Post()
  async create(@Body() dto: CreateClassesDto) {
    return this.depenseService.create(dto)
  }

  @Get()
  findAll(){
    return this.depenseService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') idCls: string) {
    return this.depenseService.findOne(+idCls);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  
  

  @Delete(':id')
  async remove(@Param('id') idCls: string) {
    return this.depenseService.remove(+idCls);
  }

  @Get('/count')
  async count(): Promise<number> {
    return this.depenseService.count();
  }

}
