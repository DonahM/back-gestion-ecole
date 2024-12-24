import { Module } from '@nestjs/common';
import { PrismaModule } from './features/prisma/prisma.module';
import { ClassesModule } from './features/classes/classes.module';
import { EtudiantsModule } from './features/etudiants/etudiants.module';
import { EcolagesModule } from './features/ecolages/ecolages.module';
import { SalairesModule } from './features/salaires/salaires.module';
import { ProfesseursModule } from './features/proffesseurs/professeurs.module';
import { MatieresModule } from './features/matieres/matieres.module';
import { NotesModule } from './features/notes/notes.module';
import { YearsSchoolModule } from './features/years_school/years_school.module';

@Module({
  imports: [
    PrismaModule,
    ClassesModule,
    EtudiantsModule,
    EcolagesModule,
    SalairesModule,
    ProfesseursModule,
    MatieresModule,
    NotesModule,
    YearsSchoolModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
