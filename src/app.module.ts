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
import { AuthClientModule } from './features/auth-client/auth-client.module';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { SemestreModule } from './features/semestre/semestre.module';

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
    YearsSchoolModule,
    AuthClientModule,
    SemestreModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
