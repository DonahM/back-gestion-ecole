import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber,IsString } from 'class-validator';

export class CreateClassesDto {
  @ApiProperty()
  idCls: number;
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  annee: string;
}
