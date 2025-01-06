import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthClientDto } from './dto/create-client.dto';

@Injectable()
export class AuthClientService {
    constructor(private prisma: PrismaService) {}

  // Méthode pour authentifier l'étudiant
  async authenticate(loginDto: AuthClientDto): Promise<any> {
    const { matricule, password } = loginDto;

    // Vérification si l'étudiant existe dans la base de données
    const etudiant = await this.prisma.etudiants.findFirst({
      where: { matricule: matricule },
    });

    if (!etudiant || etudiant.password !== password) {
      return null; // Authentification échouée
    }

    // Retourne les données de l'étudiant s'il est authentifié
    return { success: true, data: etudiant };
  }
}
