import { IsInt } from 'class-validator';

export class DeleteClassEYearDto {
  @IsInt()
  idCls: number;

  @IsInt()
  idSchool: number;
}
