import { ApiProperty } from '@nestjs/swagger';
import { IsNumber,IsString, IsOptional, IsNotEmpty, } from 'class-validator';


export class CreateYearsSchoolDto {
  @IsNotEmpty() // Assurez-vous que cette validation est présente
  @ApiProperty()
  @IsString()
  annee_scolaire: string;
}
