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
import { MatieresService } from './matieres.service';
import { CreateMatieresDto } from './dto/create-matieres.dto';

@Controller('matieres')
export class MatieresController {
    constructor(private readonly matieresservice: MatieresService) {}

  @Post()
  async create(@Body() dto: CreateMatieresDto) {
    return this.matieresservice.create(dto)
  }

  @Get()
  findAll(){
    return this.matieresservice.findAll()
  }

  @Get(':id')
  findOne(@Param('id') idCls: string) {
    return this.matieresservice.findOne(+idCls);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  
  

  @Delete(':id')
  async remove(@Param('id') idCls: string) {
    return this.matieresservice.remove(+idCls);
  }

  @Get('/count')
  async count(): Promise<number> {
    return this.matieresservice.count();
  }

}
