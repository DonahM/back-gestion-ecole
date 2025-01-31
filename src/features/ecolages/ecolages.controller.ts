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
import { EcolagesService } from './ecolages.service';
import { CreateEcolagesDto } from './dto/create-ecolages.dto';

@Controller('ecolages')
export class EcolagesController {
    constructor(private readonly ecolagesService: EcolagesService) {}
  @Post()
  async create(@Body() dto: CreateEcolagesDto) {
    return this.ecolagesService.create(dto)
  }

  @Get()
  findAll(){
    return this.ecolagesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') idEco: string) {
    return this.ecolagesService.findOne(+idEco);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  
  

  @Delete(':id')
  async remove(@Param('id') idEco: string) {
    return this.ecolagesService.remove(+idEco);
  }

  @Get('/count')
  async count(): Promise<number> {
    return this.ecolagesService.count();
  }
}
