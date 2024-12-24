import { ApiProperty } from '@nestjs/swagger';
import { IsNumber,IsString, IsOptional } from 'class-validator';

export class CreateNotesDto {
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  note: number;
  
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  coefficient: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  idEdt: number;
  
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  idMat: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idSchool: number;
  
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idSem: number;
}