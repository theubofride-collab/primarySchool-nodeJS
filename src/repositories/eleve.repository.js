const prisma = require('../prisma/client');

const userPublicSelect = {
  id: true,
  nom: true,
  prenom: true,
  email: true,
  telephone: true,
  role: true,
  photoUrl: true,
  actif: true,
  createdAt: true,
  updatedAt: true,
};

const enseignantWithUser = {
  include: {
    user: {
      select: userPublicSelect,
    },
  },
};

exports.findByIdWithRelations = async (id) => {
  return prisma.eleve.findUnique({
    where: { id },
    include: {
      villeNaissance: true,
      quartier: true,
      tuteurs: {
        include: {
          tuteur: {
            include: {
              quartier: true,
            },
          },
        },
        orderBy: {
          principal: 'desc',
        },
      },
      inscriptions: {
        include: {
          classe: {
            include: {
              cycle: true,
            },
          },
          salle: true,
          anneeAcademique: {
            include: {
              trimestres: true,
            },
          },
          paiements: {
            include: {
              tranche: {
                include: {
                  scolarite: true,
                },
              },
              modePaiement: true,
            },
            orderBy: {
              datePaiement: 'desc',
            },
          },
        },
        orderBy: {
          dateInscription: 'desc',
        },
      },
      notes: {
        include: {
          evaluation: {
            include: {
              trimestre: {
                include: {
                  anneeAcademique: true,
                },
              },
              matiere: true,
              classe: {
                include: {
                  cycle: true,
                },
              },
              enseignant: enseignantWithUser,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      absences: {
        include: {
          enseignant: enseignantWithUser,
        },
        orderBy: {
          dateAbsence: 'desc',
        },
      },
      incidents: {
        include: {
          enseignant: enseignantWithUser,
          sanction: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
};
