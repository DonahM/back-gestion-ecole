import { IsInt } from 'class-validator';

export class CreateClassEYearDto {
  @IsInt()
  idCls: number;

  @IsInt()
  idSchool: number;
}
