/*
  Warnings:

  - A unique constraint covering the columns `[matricule]` on the table `etudiants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idCls]` on the table `etudiants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matricule` to the `etudiants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `etudiants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `etudiants` ADD COLUMN `matricule` INTEGER NOT NULL,
    ADD COLUMN `password` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `etudiants_matricule_key` ON `etudiants`(`matricule`);

-- CreateIndex
CREATE UNIQUE INDEX `etudiants_idCls_key` ON `etudiants`(`idCls`);
