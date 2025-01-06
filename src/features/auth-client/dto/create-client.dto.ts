import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class AuthClientDto {
  @IsNumber()
  @IsNotEmpty()
  matricule: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
