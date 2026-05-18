-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'SECRETAIRE', 'ENSEIGNANT') NOT NULL,
    `photoUrl` VARCHAR(191) NULL,
    `actif` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quartier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ville` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tuteur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `profession` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `adresse` VARCHAR(191) NULL,
    `quartierId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Eleve` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matricule` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `dateNaissance` DATETIME(3) NOT NULL,
    `lieuNaissance` VARCHAR(191) NOT NULL,
    `sexe` ENUM('M', 'F') NOT NULL,
    `langue` VARCHAR(191) NULL,
    `allergie` VARCHAR(191) NULL,
    `photoUrl` VARCHAR(191) NULL,
    `actif` BOOLEAN NOT NULL DEFAULT true,
    `villeNaissanceId` INTEGER NOT NULL,
    `quartierId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Eleve_matricule_key`(`matricule`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EleveTuteur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eleveId` INTEGER NOT NULL,
    `tuteurId` INTEGER NOT NULL,
    `lienParente` VARCHAR(191) NOT NULL,
    `principal` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cycle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Classe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `cycleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Salle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NULL,
    `surface` VARCHAR(191) NULL,
    `capacite` INTEGER NULL,
    `actif` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnneeAcademique` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `dateDebut` DATETIME(3) NOT NULL,
    `dateFin` DATETIME(3) NOT NULL,
    `actif` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trimestre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `dateDebut` DATETIME(3) NOT NULL,
    `dateFin` DATETIME(3) NOT NULL,
    `anneeAcademiqueId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eleveId` INTEGER NOT NULL,
    `classeId` INTEGER NOT NULL,
    `salleId` INTEGER NULL,
    `anneeAcademiqueId` INTEGER NOT NULL,
    `dateInscription` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `statut` ENUM('ACTIVE', 'CLOTUREE', 'SUSPENDUE') NOT NULL,
    `createdById` INTEGER NOT NULL,

    UNIQUE INDEX `Inscription_eleveId_anneeAcademiqueId_key`(`eleveId`, `anneeAcademiqueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matiere` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `coefficient` DOUBLE NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enseignant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `grade` VARCHAR(191) NULL,
    `specialite` VARCHAR(191) NULL,
    `diplomeUrl` VARCHAR(191) NULL,

    UNIQUE INDEX `Enseignant_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enseignement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enseignantId` INTEGER NOT NULL,
    `matiereId` INTEGER NOT NULL,
    `classeId` INTEGER NOT NULL,
    `anneeAcademiqueId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evaluation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `type` ENUM('DEVOIR', 'INTERRO', 'EXAMEN', 'COMPOSITION') NOT NULL,
    `dateEvaluation` DATETIME(3) NOT NULL,
    `bareme` DOUBLE NOT NULL,
    `coefficient` DOUBLE NOT NULL,
    `trimestreId` INTEGER NOT NULL,
    `matiereId` INTEGER NOT NULL,
    `classeId` INTEGER NOT NULL,
    `enseignantId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `evaluationId` INTEGER NOT NULL,
    `eleveId` INTEGER NOT NULL,
    `valeur` DOUBLE NOT NULL,
    `appreciation` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Note_evaluationId_eleveId_key`(`evaluationId`, `eleveId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Absence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eleveId` INTEGER NOT NULL,
    `dateAbsence` DATETIME(3) NOT NULL,
    `motif` VARCHAR(191) NULL,
    `justifiee` BOOLEAN NOT NULL DEFAULT false,
    `enseignantId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Incident` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eleveId` INTEGER NOT NULL,
    `enseignantId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `gravite` ENUM('FAIBLE', 'MOYENNE', 'GRAVE') NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `statut` ENUM('EN_ATTENTE', 'TRAITE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sanction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `incidentId` INTEGER NOT NULL,
    `contenu` VARCHAR(191) NOT NULL,
    `dateSanction` DATETIME(3) NOT NULL,
    `appliqueParId` INTEGER NOT NULL,

    UNIQUE INDEX `Sanction_incidentId_key`(`incidentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModePaiement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `information` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paiement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inscriptionId` INTEGER NOT NULL,
    `trancheId` INTEGER NOT NULL,
    `montant` DOUBLE NOT NULL,
    `referenceOperation` VARCHAR(191) NULL,
    `modePaiementId` INTEGER NOT NULL,
    `recuUrl` VARCHAR(191) NULL,
    `commentaire` VARCHAR(191) NULL,
    `enregistreParId` INTEGER NOT NULL,
    `datePaiement` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Scolarite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cycleId` INTEGER NOT NULL,
    `anneeAcademiqueId` INTEGER NOT NULL,
    `inscription` DOUBLE NOT NULL,
    `pension` DOUBLE NOT NULL,
    `nombreTranches` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tranche` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scolariteId` INTEGER NOT NULL,
    `libelle` VARCHAR(191) NOT NULL,
    `montant` DOUBLE NOT NULL,
    `dateLimite` DATETIME(3) NOT NULL,
    `ordre` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tuteur` ADD CONSTRAINT `Tuteur_quartierId_fkey` FOREIGN KEY (`quartierId`) REFERENCES `Quartier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Eleve` ADD CONSTRAINT `Eleve_villeNaissanceId_fkey` FOREIGN KEY (`villeNaissanceId`) REFERENCES `Ville`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Eleve` ADD CONSTRAINT `Eleve_quartierId_fkey` FOREIGN KEY (`quartierId`) REFERENCES `Quartier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EleveTuteur` ADD CONSTRAINT `EleveTuteur_eleveId_fkey` FOREIGN KEY (`eleveId`) REFERENCES `Eleve`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EleveTuteur` ADD CONSTRAINT `EleveTuteur_tuteurId_fkey` FOREIGN KEY (`tuteurId`) REFERENCES `Tuteur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classe` ADD CONSTRAINT `Classe_cycleId_fkey` FOREIGN KEY (`cycleId`) REFERENCES `Cycle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trimestre` ADD CONSTRAINT `Trimestre_anneeAcademiqueId_fkey` FOREIGN KEY (`anneeAcademiqueId`) REFERENCES `AnneeAcademique`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscription` ADD CONSTRAINT `Inscription_eleveId_fkey` FOREIGN KEY (`eleveId`) REFERENCES `Eleve`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscription` ADD CONSTRAINT `Inscription_classeId_fkey` FOREIGN KEY (`classeId`) REFERENCES `Classe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscription` ADD CONSTRAINT `Inscription_salleId_fkey` FOREIGN KEY (`salleId`) REFERENCES `Salle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscription` ADD CONSTRAINT `Inscription_anneeAcademiqueId_fkey` FOREIGN KEY (`anneeAcademiqueId`) REFERENCES `AnneeAcademique`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enseignant` ADD CONSTRAINT `Enseignant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enseignement` ADD CONSTRAINT `Enseignement_enseignantId_fkey` FOREIGN KEY (`enseignantId`) REFERENCES `Enseignant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enseignement` ADD CONSTRAINT `Enseignement_matiereId_fkey` FOREIGN KEY (`matiereId`) REFERENCES `Matiere`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enseignement` ADD CONSTRAINT `Enseignement_classeId_fkey` FOREIGN KEY (`classeId`) REFERENCES `Classe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_trimestreId_fkey` FOREIGN KEY (`trimestreId`) REFERENCES `Trimestre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_matiereId_fkey` FOREIGN KEY (`matiereId`) REFERENCES `Matiere`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_classeId_fkey` FOREIGN KEY (`classeId`) REFERENCES `Classe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_enseignantId_fkey` FOREIGN KEY (`enseignantId`) REFERENCES `Enseignant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_evaluationId_fkey` FOREIGN KEY (`evaluationId`) REFERENCES `Evaluation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_eleveId_fkey` FOREIGN KEY (`eleveId`) REFERENCES `Eleve`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Absence` ADD CONSTRAINT `Absence_eleveId_fkey` FOREIGN KEY (`eleveId`) REFERENCES `Eleve`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Absence` ADD CONSTRAINT `Absence_enseignantId_fkey` FOREIGN KEY (`enseignantId`) REFERENCES `Enseignant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Incident` ADD CONSTRAINT `Incident_eleveId_fkey` FOREIGN KEY (`eleveId`) REFERENCES `Eleve`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Incident` ADD CONSTRAINT `Incident_enseignantId_fkey` FOREIGN KEY (`enseignantId`) REFERENCES `Enseignant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sanction` ADD CONSTRAINT `Sanction_incidentId_fkey` FOREIGN KEY (`incidentId`) REFERENCES `Incident`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paiement` ADD CONSTRAINT `Paiement_inscriptionId_fkey` FOREIGN KEY (`inscriptionId`) REFERENCES `Inscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paiement` ADD CONSTRAINT `Paiement_trancheId_fkey` FOREIGN KEY (`trancheId`) REFERENCES `Tranche`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paiement` ADD CONSTRAINT `Paiement_modePaiementId_fkey` FOREIGN KEY (`modePaiementId`) REFERENCES `ModePaiement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tranche` ADD CONSTRAINT `Tranche_scolariteId_fkey` FOREIGN KEY (`scolariteId`) REFERENCES `Scolarite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
