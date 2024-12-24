import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { YearsSchoolService } from './years_school.service';
import { years_schools } from '@prisma/client';
import { CreateYearsSchoolDto } from './dto/create-years-school.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('years-school')
export class YearsSchoolController {
  constructor(private readonly yearsSchoolService: YearsSchoolService) {}

  @Get()
  async findAll(
    @Query('enablePagination') enablePagination: boolean = false,
    @Query('page') page: string = '1',
    @Query('itemsPerPage') itemsPerPage: string = '5',
  ): Promise<{ data: years_schools[]; total: number }> {
    const pageNum = parseInt(page);
    const items = parseInt(itemsPerPage);
    const data = await this.yearsSchoolService.fetchDatabases(
      enablePagination,
      pageNum,
      items,
    );
    const total = await this.yearsSchoolService.count();
    return { data, total };
  }

  @Get(':id')
  async findOne(@Param('id') idSchool: string) {
    const id = parseInt(idSchool, 10);
    if (isNaN(id)) {
      throw new HttpException('Invalid ID format', 400);
    }
    const result = await this.yearsSchoolService.findOne(id);
    if (!result) {
      throw new HttpException(`Year School with ID ${id} not found`, 404);
    }
    return result;
  }

  @Post()
  async create(@Body() dto: CreateYearsSchoolDto) {
    return this.yearsSchoolService.create(dto);
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      const uploadedFiles = files.map(file => ({
        filename: file.originalname,
        path: `/uploads/${file.filename}`,
      }));
      return { message: 'Files uploaded successfully', files: uploadedFiles };
    } catch (error) {
      throw new HttpException('File upload failed', 500);
    }
  }

  @Delete(':id')
  async remove(@Param('id') idSchool: string) {
    const id = parseInt(idSchool, 10);
    if (isNaN(id)) {
      throw new HttpException('Invalid ID format', 400);
    }
    return this.yearsSchoolService.remove(id);
  }
}
  