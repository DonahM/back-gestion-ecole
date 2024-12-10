import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber,IsString ,IsOptional } from 'class-validator';

export class CreateEtudiantsDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  surname: string;
  @IsNumber()
  @ApiProperty()
  age: number;
  @IsString()
  @ApiProperty()
  image: string
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  idCls: number;
}
