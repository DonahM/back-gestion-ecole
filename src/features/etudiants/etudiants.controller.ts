import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    Patch,
    Post,
    Query,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
  } from '@nestjs/common';
  import { EtudiantsService } from './etudiants.service';
  import { etudiants} from '@prisma/client';
  import { CreateEtudiantsDto } from './dto/create-etudiants.dto';
  import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express/multer';
  import UploadFileUsecase from 'src/core/usecases/upload_file_usecase';

@Controller('etudiants')
export class EtudiantsController {
    constructor(private readonly etudiantsService: EtudiantsService) {}

  @Get('/list')
  async fetchDatabases(
    @Query('enablePagination') enablePagination: boolean = false,
    @Query('page') page: string = '1',
    @Query('itemsPerPage') itemsPerPage: string = '5',
  ): Promise<etudiants[] | null> {
    const pageNum = parseInt(page);
    const items = parseInt(itemsPerPage);
    return this.etudiantsService.fetchDatabases(
      enablePagination,
      pageNum,
      items,
    );
  }

  @Get('/directory/:dir_name')
  async serveFiles(
    @Param('dir_name') dirName: string,
  ): Promise<string[] | null> {
    const files = this.etudiantsService.serveFiles(dirName);
    return files;
  }
  
  @Post()
  create(@Body() dto: CreateEtudiantsDto) {
    return this.etudiantsService.create(dto);
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Get()
  findAll(){
    return this.etudiantsService.findAll()
  }

  @Get('/etudiants/:id')
  async findByGenre(@Param('id') idEdt: number): Promise<etudiants[]> {
    return this.etudiantsService.findByGenre(+idEdt);
  }

  @Get('/count')
  async count(): Promise<number> {
    return this.etudiantsService.count();
  }

  @Delete(':id')
  remove(@Param('id') IdCom: string) {
    return this.etudiantsService.remove(+IdCom);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {}
}
