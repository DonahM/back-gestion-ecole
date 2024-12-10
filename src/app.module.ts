import { Module } from '@nestjs/common';
import { PrismaModule } from './features/prisma/prisma.module';
import { ClassesModule } from './features/classes/classes.module';
import { EtudiantsModule } from './features/etudiants/etudiants.module';

@Module({
  imports: [
    PrismaModule,
    ClassesModule,
    EtudiantsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
