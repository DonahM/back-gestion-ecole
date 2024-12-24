-- CreateTable
CREATE TABLE `user` (
    `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `cin` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `roles` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classE` (
    `idCls` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `titulaire` VARCHAR(255) NOT NULL,
    `num` VARCHAR(255) NOT NULL,
    `idSchool` INTEGER NOT NULL,

    PRIMARY KEY (`idCls`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etudiants` (
    `idEdt` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `date_naiss` VARCHAR(255) NOT NULL,
    `lieu_naiss` VARCHAR(255) NOT NULL,
    `sexe` VARCHAR(255) NOT NULL,
    `tel` VARCHAR(255) NOT NULL,
    `adress_edt` VARCHAR(255) NOT NULL,
    `father` VARCHAR(255) NOT NULL,
    `jobs_f` VARCHAR(255) NOT NULL,
    `mother` VARCHAR(255) NOT NULL,
    `jobs_m` VARCHAR(255) NOT NULL,
    `tel_parent` VARCHAR(255) NOT NULL,
    `adresse_parent` VARCHAR(255) NOT NULL,
    `titeur` VARCHAR(255) NOT NULL,
    `tel_titeur` VARCHAR(255) NOT NULL,
    `adress_titeur` VARCHAR(255) NOT NULL,
    `ecole_anter` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `idCls` INTEGER NOT NULL,
    `idSchool` INTEGER NOT NULL,

    PRIMARY KEY (`idEdt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ecolages` (
    `idEco` INTEGER NOT NULL AUTO_INCREMENT,
    `mois` VARCHAR(255) NOT NULL,
    `valeur` INTEGER NOT NULL,
    `statut` VARCHAR(255) NOT NULL,
    `date` VARCHAR(255) NOT NULL,
    `idEdt` INTEGER NOT NULL,
    `idSchool` INTEGER NOT NULL,

    PRIMARY KEY (`idEco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professeurs` (
    `idProf` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `matiere` VARCHAR(255) NOT NULL,
    `idSchool` INTEGER NOT NULL,

    PRIMARY KEY (`idProf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salaires` (
    `idSal` INTEGER NOT NULL AUTO_INCREMENT,
    `mois` VARCHAR(255) NOT NULL,
    `statut` VARCHAR(255) NOT NULL,
    `valeur` INTEGER NOT NULL,
    `date` VARCHAR(255) NOT NULL,
    `idProf` INTEGER NOT NULL,
    `idSchool` INTEGER NOT NULL,

    PRIMARY KEY (`idSal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matieres` (
    `idMat` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(225) NOT NULL,
    `idEdt` INTEGER NOT NULL,
    `idSchool` INTEGER NOT NULL,

    PRIMARY KEY (`idMat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notes` (
    `idNot` INTEGER NOT NULL AUTO_INCREMENT,
    `note` INTEGER NOT NULL,
    `coefficient` INTEGER NOT NULL,
    `idEdt` INTEGER NOT NULL,
    `idMat` INTEGER NOT NULL,
    `idSchool` INTEGER NOT NULL,
    `idSem` INTEGER NOT NULL,

    PRIMARY KEY (`idNot`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `semestre` (
    `idSem` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `idSchool` INTEGER NOT NULL,

    PRIMARY KEY (`idSem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `years_schools` (
    `idSchool` INTEGER NOT NULL AUTO_INCREMENT,
    `annee_scolaire` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idSchool`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `classE` ADD CONSTRAINT `classE_idSchool_fkey` FOREIGN KEY (`idSchool`) REFERENCES `years_schools`(`idSchool`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `etudiants` ADD CONSTRAINT `etudiants_idCls_fkey` FOREIGN KEY (`idCls`) REFERENCES `classE`(`idCls`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `etudiants` ADD CONSTRAINT `etudiants_idSchool_fkey` FOREIGN KEY (`idSchool`) REFERENCES `years_schools`(`idSchool`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ecolages` ADD CONSTRAINT `ecolages_idEdt_fkey` FOREIGN KEY (`idEdt`) REFERENCES `etudiants`(`idEdt`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ecolages` ADD CONSTRAINT `ecolages_idSchool_fkey` FOREIGN KEY (`idSchool`) REFERENCES `years_schools`(`idSchool`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `professeurs` ADD CONSTRAINT `professeurs_idSchool_fkey` FOREIGN KEY (`idSchool`) REFERENCES `years_schools`(`idSchool`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `salaires` ADD CONSTRAINT `salaires_idProf_fkey` FOREIGN KEY (`idProf`) REFERENCES `professeurs`(`idProf`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `salaires` ADD CONSTRAINT `salaires_idSchool_fkey` FOREIGN KEY (`idSchool`) REFERENCES `years_schools`(`idSchool`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `matieres` ADD CONSTRAINT `matieres_idEdt_fkey` FOREIGN KEY (`idEdt`) REFERENCES `etudiants`(`idEdt`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `matieres` ADD CONSTRAINT `matieres_idSchool_fkey` FOREIGN KEY (`idSchool`) REFERENCES `years_schools`(`idSchool`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_idEdt_fkey` FOREIGN KEY (`idEdt`) REFERENCES `etudiants`(`idEdt`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_idMat_fkey` FOREIGN KEY (`idMat`) REFERENCES `matieres`(`idMat`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_idSchool_fkey` FOREIGN KEY (`idSchool`) REFERENCES `years_schools`(`idSchool`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_idSem_fkey` FOREIGN KEY (`idSem`) REFERENCES `semestre`(`idSem`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `semestre` ADD CONSTRAINT `semestre_idSchool_fkey` FOREIGN KEY (`idSchool`) REFERENCES `years_schools`(`idSchool`) ON DELETE NO ACTION ON UPDATE NO ACTION;
