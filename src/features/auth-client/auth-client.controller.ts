import { Controller, Post, Body, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthClientDto } from './dto/create-client.dto';


@Controller('auth-client')
export class AuthClientController {
    constructor(private readonly prisma: PrismaService) {}

  @Post('authenticate')
  async authenticate(@Body() body: AuthClientDto) {
    const { matricule, password } = body;

    // Rechercher l'étudiant par matricule
    const etudiant = await this.prisma.etudiants.findFirst({
      where: { matricule },
    });

    if (!etudiant) {
      throw new NotFoundException('Étudiant non trouvé');
    }

    if (etudiant.password !== password) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    // Réponse en cas de succès
    return {
      success: true,
      data: {
        matricule: etudiant.matricule,
        name: etudiant.name,
      },
    };
}
}
