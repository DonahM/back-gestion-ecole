import { Body, Controller,
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
  import { NotesService } from './notes.service';
  import { notes} from '@prisma/client';
  import { CreateNotesDto } from './dto/create-notes.dto';
  import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express/multer';
  import UploadFileUsecase from 'src/core/usecases/upload_file_usecase';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

  @Get('/list')
  async fetchDatabases(
    @Query('enablePagination') enablePagination: boolean = false,
    @Query('page') page: string = '1',
    @Query('itemsPerPage') itemsPerPage: string = '5',
  ): Promise<notes[] | null> {
    const pageNum = parseInt(page);
    const items = parseInt(itemsPerPage);
    return this.notesService.fetchDatabases(
      enablePagination,
      pageNum,
      items,
    );
  }

  @Get('/directory/:dir_name')
  async serveFiles(
    @Param('dir_name') dirName: string,
  ): Promise<string[] | null> {
    const files = this.notesService.serveFiles(dirName);
    return files;
  }
  
  @Post()
  create(@Body() dto: CreateNotesDto) {
    return this.notesService.create(dto);
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Get()
  findAll(){
    return this.notesService.findAll()
  }

  @Get('/notes/:id')
  async findByEtudiants(@Param('id') idNot: number): Promise<notes[]> {
    return this.notesService.findByEtudiants(+idNot);
  }

  @Get('/count')
  async count(): Promise<number> {
    return this.notesService.count();
  }

  // @Patch(':id')
  // async update(@Param('id') idNot: number, @Body() updateEtudiantsDto: UpdateEtudiantsDto) {
  //   return this.notesService.update(+idNot, updateEtudiantsDto);
  // }

  @Get(':id')
  async findOne(@Param('id') idNot: string) {
  const id = parseInt(idNot, 10); // Convertir l'ID en nombre
  if (isNaN(id)) {
    throw new HttpException('Invalid ID format', 400); // Gérer les ID invalides
  }
  return this.notesService.findOne(id);
}

  

  @Delete(':id')
  remove(@Param('id') IdCom: string) {
    return this.notesService.remove(+IdCom);
  }
}
