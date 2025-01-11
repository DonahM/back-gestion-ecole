import { Body,
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
    ParseIntPipe 
  } from '@nestjs/common';
  import { SemestreService } from './semestre.service';
  import { semestre} from '@prisma/client';
  import { CreatesemestreDto } from './dto/create-semestre.dto';
  import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('semestres')
export class SemestreController {
    constructor(private readonly semestreService: SemestreService) {}

  @Get('/list')
  async fetchDatabases(
    @Query('enablePagination') enablePagination: boolean = false,
    @Query('page') page: string = '1',
    @Query('itemsPerPage') itemsPerPage: string = '5',
  ): Promise<semestre[] | null> {
    const pageNum = parseInt(page);
    const items = parseInt(itemsPerPage);
    return this.semestreService.fetchDatabases(
      enablePagination,
      pageNum,
      items,
    );
  }

  @Get('/directory/:dir_name')
  async serveFiles(
    @Param('dir_name') dirName: string,
  ): Promise<string[] | null> {
    const files = this.semestreService.serveFiles(dirName);
    return files;
  }
  
  @Post()
  create(@Body() dto: CreatesemestreDto) {
    return this.semestreService.create(dto);
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Get()
  findAll(){
    return this.semestreService.findAll()
  }

  @Get('/semestre/:id')
  async findByEtudiants(@Param('id') idSem: number): Promise<semestre[]> {
    return this.semestreService.findByEtudiants(+idSem);
  }

//   @Get('matricule/:matricule')
//   async findByMatricule(@Param('matricule', ParseIntPipe) matricule: number): Promise<etudiants[]> {
//     return this.semestreService.findByMatricule(matricule);
//   }

  @Get('/count')
  async count(): Promise<number> {
    return this.semestreService.count();
  }

//   @Patch(':id')
//   async update(@Param('id') idSem: number, @Body() updateEtudiantsDto: UpdateEtudiantsDto) {
//     return this.semestreService.update(+idSem, updateEtudiantsDto);
//   }

  @Get(':id')
  async findOne(@Param('id') idSem: string) {
  const id = parseInt(idSem, 10); // Convertir l'ID en nombre
  if (isNaN(id)) {
    throw new HttpException('Invalid ID format', 400); // Gérer les ID invalides
  }
  return this.semestreService.findOne(id);
}

  

  @Delete(':id')
  remove(@Param('id') IdCom: string) {
    return this.semestreService.remove(+IdCom);
  }
}
