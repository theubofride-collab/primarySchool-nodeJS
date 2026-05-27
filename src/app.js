const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const eleveRoutes = require('./routes/eleve.routes');
const createCrudRoutes = require('./routes/crud.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Auth routes (public)
app.use('/auth', authRoutes);

// User routes (protected)
app.use('/users', userRoutes);
app.use('/eleves', eleveRoutes);

const crudRoutes = [
  { path: '/quartiers', modelName: 'quartier', label: 'Quartier' },
  { path: '/villes', modelName: 'ville', label: 'Ville' },
  { path: '/tuteurs', modelName: 'tuteur', label: 'Tuteur' },
  { path: '/eleve-tuteurs', modelName: 'eleveTuteur', label: 'EleveTuteur' },
  { path: '/cycles', modelName: 'cycle', label: 'Cycle' },
  { path: '/classes', modelName: 'classe', label: 'Classe' },
  { path: '/salles', modelName: 'salle', label: 'Salle' },
  { path: '/annees-academiques', modelName: 'anneeAcademique', label: 'AnneeAcademique' },
  { path: '/trimestres', modelName: 'trimestre', label: 'Trimestre' },
  { path: '/inscriptions', modelName: 'inscription', label: 'Inscription' },
  { path: '/matieres', modelName: 'matiere', label: 'Matiere' },
  { path: '/enseignants', modelName: 'enseignant', label: 'Enseignant' },
  { path: '/enseignements', modelName: 'enseignement', label: 'Enseignement' },
  { path: '/evaluations', modelName: 'evaluation', label: 'Evaluation' },
  { path: '/notes', modelName: 'note', label: 'Note' },
  { path: '/absences', modelName: 'absence', label: 'Absence' },
  { path: '/incidents', modelName: 'incident', label: 'Incident' },
  { path: '/sanctions', modelName: 'sanction', label: 'Sanction' },
  { path: '/modes-paiement', modelName: 'modePaiement', label: 'ModePaiement' },
  { path: '/paiements', modelName: 'paiement', label: 'Paiement' },
  { path: '/scolarites', modelName: 'scolarite', label: 'Scolarite' },
  { path: '/tranches', modelName: 'tranche', label: 'Tranche' },
];

crudRoutes.forEach(({ path, modelName, label }) => {
  app.use(path, createCrudRoutes(modelName, label));
});

app.use(errorHandler);

module.exports = app;
