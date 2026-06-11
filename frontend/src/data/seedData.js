export const sectors = [
  {
    title: 'Bois',
    slug: 'bois',
    description: 'Metiers lies a la menuiserie, sculpture et finition decorative sur bois.',
    image: '/images/bois.jpg',
    formations: ['sculpture-sur-bois', 'peinture-sur-bois', 'menuiserie-generale'],
    isPublished: true
  },
  {
    title: 'Pierre et argile',
    slug: 'pierre-et-argile',
    description: 'Savoir-faire traditionnels autour du platre, zellige, poterie et materiaux mineraux.',
    image: '/images/zellige.jpg',
    formations: ['sculpture-sur-platre', 'zellige', 'poterie'],
    isPublished: true
  },
  {
    title: 'Textile',
    slug: 'textile',
    description: 'Formation aux techniques de couture, tissage, tapisserie et valorisation textile.',
    image: '/images/CFMA-img14.jpg',
    formations: ['couture-traditionnelle', 'couture-moderne', 'tissage', 'tapisserie', 'tapis'],
    isPublished: true
  },
  {
    title: 'Metaux',
    slug: 'metaux',
    description: 'Travail du fer, aluminium et bijouterie artisanale.',
    image: '/images/CFMA.jpg',
    formations: ['ferronnerie-art', 'menuiserie-aluminium', 'bijouterie'],
    isPublished: true
  },
  {
    title: 'Cuir',
    slug: 'cuir',
    description: 'Techniques de maroquinerie, conception et finition des articles en cuir.',
    image: '/images/CFMA-img10.jpg',
    formations: ['maroquinerie'],
    isPublished: true
  },
  {
    title: 'Produits vegetaux',
    slug: 'produits-vegetaux',
    description: 'Vannerie et transformation de matieres vegetales tressees.',
    image: '/images/vannerie.jpg',
    formations: ['vannerie'],
    isPublished: true
  }
];

export const formations = [
  {
    title: "Ferronnerie d'art",
    slug: 'ferronnerie-art',
    sector: 'metaux',
    type: 'Formation initiale',
    description: "Immersion dans la creation metallique, entre techniques traditionnelles et approches contemporaines du travail du fer.",
    duration: 'Selon le parcours',
    level: 'Qualification professionnelle',
    requirements: ['Motivation pour le travail manuel', 'Age recommande: 15 a 30 ans pour l apprentissage'],
    skills: ['Travail du fer', 'Soudure et assemblage', 'Finition decorative'],
    opportunities: ['Atelier artisanal', 'Ferronnerie decorative', 'Auto-entrepreneuriat'],
    image: '/images/CFMA.jpg',
    isPublished: true
  },
  {
    title: 'Couture traditionnelle',
    slug: 'couture-traditionnelle',
    sector: 'textile',
    type: 'Formation initiale',
    description: 'Apprentissage des bases de couture, prise de mesures, patronage, coupe et techniques manuelles et machine.',
    duration: 'Selon le parcours',
    level: 'Qualification professionnelle',
    requirements: ['Interet pour le textile', 'Precision et patience'],
    skills: ['Patronage', 'Coupe', 'Couture traditionnelle'],
    opportunities: ['Atelier de couture', 'Retouches', 'Creation textile'],
    image: '/images/CFMA-img14.jpg',
    isPublished: true
  },
  {
    title: 'Couture moderne',
    slug: 'couture-moderne',
    sector: 'textile',
    type: 'Formation initiale',
    description: 'Exploration des tendances contemporaines de la mode avec methodes, materiaux et finitions actuelles.',
    duration: 'Selon le parcours',
    level: 'Qualification professionnelle',
    requirements: ['Bases de couture recommandees', 'Sens du detail'],
    skills: ['Design vestimentaire', 'Couture machine', 'Finitions modernes'],
    opportunities: ['Mode', 'Atelier textile', 'Micro-entreprise'],
    image: '/images/CFMA-img14.jpg',
    isPublished: true
  },
  {
    title: "Menuiserie d'aluminium",
    slug: 'menuiserie-aluminium',
    sector: 'metaux',
    type: 'Formation initiale',
    description: "Fabrication et installation de structures en aluminium utilisees dans la construction et l amenagement.",
    duration: 'Selon le parcours',
    level: 'Qualification professionnelle',
    requirements: ['Aptitude au travail technique', 'Respect des consignes de securite'],
    skills: ['Mesure', 'Assemblage aluminium', 'Installation'],
    opportunities: ['Menuiserie aluminium', 'Chantiers', 'Atelier technique'],
    image: '/images/CFMA-img1.jpg',
    isPublished: true
  },
  {
    title: 'Poterie',
    slug: 'poterie',
    sector: 'pierre-et-argile',
    type: 'Formation initiale',
    description: "Formation artistique autour du travail de l argile et de la creation d objets fonctionnels ou decoratifs.",
    duration: 'Selon le parcours',
    level: 'Specialisation professionnelle',
    requirements: ['Interet pour les arts manuels'],
    skills: ['Modelage', 'Decoration', 'Finition ceramique'],
    opportunities: ['Atelier de poterie', 'Decoration artisanale', 'Vente locale'],
    image: '/images/CFMA-img3.jpg',
    isPublished: true
  },
  {
    title: 'Sculpture sur platre',
    slug: 'sculpture-sur-platre',
    sector: 'pierre-et-argile',
    type: 'Formation initiale',
    description: 'Transformation du platre en elements sculpturaux et decoratifs.',
    duration: 'Selon le parcours',
    level: 'Specialisation professionnelle',
    requirements: ['Precision', 'Interet pour le dessin et le relief'],
    skills: ['Moulage', 'Sculpture', 'Finition'],
    opportunities: ['Decoration interieure', 'Atelier artisanal', 'Restauration decorative'],
    image: '/images/CFMA-img5.jpg',
    isPublished: true
  },
  {
    title: 'Maroquinerie',
    slug: 'maroquinerie',
    sector: 'cuir',
    type: 'Formation initiale',
    description: 'Techniques de fabrication d articles en cuir, sacs, portefeuilles, ceintures et accessoires.',
    duration: 'Selon le parcours',
    level: 'Qualification professionnelle',
    requirements: ['Precision', 'Interet pour le cuir'],
    skills: ['Coupe du cuir', 'Assemblage', 'Finitions'],
    opportunities: ['Maroquinerie', 'Accessoires', 'Atelier independant'],
    image: '/images/CFMA-img10.jpg',
    isPublished: true
  },
  {
    title: 'Menuiserie generale',
    slug: 'menuiserie-generale',
    sector: 'bois',
    type: 'Formation initiale',
    description: 'Competences essentielles pour travailler le bois et fabriquer meubles, portes et elements decoratifs.',
    duration: 'Selon le parcours',
    level: 'Qualification professionnelle',
    requirements: ['Aptitude manuelle', 'Respect des regles de securite'],
    skills: ['Mesure', 'Decoupe', 'Assemblage bois'],
    opportunities: ['Menuiserie', 'Amenagement', 'Atelier bois'],
    image: '/images/CFMA-img2.jpg',
    isPublished: true
  },
  {
    title: 'Vannerie',
    slug: 'vannerie',
    sector: 'produits-vegetaux',
    type: 'Formation initiale',
    description: 'Fabrication d objets en osier, rotin, bambou et autres matieres vegetales tressees.',
    duration: 'Selon le parcours',
    level: 'Specialisation professionnelle',
    requirements: ['Patience', 'Sens artisanal'],
    skills: ['Tressage', 'Preparation des fibres', 'Finition'],
    opportunities: ['Vannerie artisanale', 'Decoration', 'Vente directe'],
    image: '/images/vannerie.jpg',
    isPublished: true
  },
  {
    title: 'Sculpture sur bois',
    slug: 'sculpture-sur-bois',
    sector: 'bois',
    type: 'Formation initiale',
    description: 'Transformation du bois en pieces sculpturales et decoratives.',
    duration: 'Selon le parcours',
    level: 'Specialisation professionnelle',
    requirements: ['Interet pour le dessin', 'Precision'],
    skills: ['Sculpture', 'Motifs decoratifs', 'Finition bois'],
    opportunities: ['Atelier bois', 'Decoration', 'Restauration artisanale'],
    image: '/images/CFMA-img.jpg',
    isPublished: true
  },
  {
    title: 'Peinture sur bois',
    slug: 'peinture-sur-bois',
    sector: 'bois',
    type: 'Formation initiale',
    description: 'Techniques de preparation, peinture et finition decorative sur surfaces en bois.',
    duration: 'Selon le parcours',
    level: 'Specialisation professionnelle',
    requirements: ['Sens artistique', 'Soin des details'],
    skills: ['Preparation du support', 'Peinture decorative', 'Vernis'],
    opportunities: ['Decoration bois', 'Artisanat', 'Atelier creatif'],
    image: '/images/peinture.jpg',
    isPublished: true
  },
  {
    title: 'Zellige',
    slug: 'zellige',
    sector: 'pierre-et-argile',
    type: 'Formation initiale',
    description: 'Apprentissage des techniques marocaines de mosaique et assemblage de carreaux emailles.',
    duration: 'Selon le parcours',
    level: 'Specialisation professionnelle',
    requirements: ['Precision', 'Interet pour les motifs geometriques'],
    skills: ['Decoupe', 'Composition', 'Pose'],
    opportunities: ['Zellige traditionnel', 'Decoration', 'Chantiers artisanaux'],
    image: '/images/zellige.jpg',
    isPublished: true
  },
  {
    title: 'Tissage',
    slug: 'tissage',
    sector: 'textile',
    type: 'Formation initiale',
    description: 'Maitrise des techniques traditionnelles de fabrication de tissus a la main.',
    duration: 'Selon le parcours',
    level: 'Specialisation professionnelle',
    requirements: ['Patience', 'Interet textile'],
    skills: ['Metier a tisser', 'Preparation des fils', 'Motifs'],
    opportunities: ['Tissage artisanal', 'Cooperative', 'Creation textile'],
    image: '/images/CFMA-img11.jpg',
    isPublished: true
  },
  {
    title: 'Tapisserie',
    slug: 'tapisserie',
    sector: 'textile',
    type: 'Formation initiale',
    description: 'Restauration et recouvrement de mobilier avec tissus ou cuir.',
    duration: 'Selon le parcours',
    level: 'Qualification professionnelle',
    requirements: ['Precision', 'Interet pour mobilier et textile'],
    skills: ['Garnissage', 'Recouvrement', 'Finition'],
    opportunities: ['Tapisserie ameublement', 'Restauration', 'Atelier textile'],
    image: '/images/CFMA-img11.jpg',
    isPublished: true
  },
  {
    title: 'Tapis',
    slug: 'tapis',
    sector: 'textile',
    type: 'Formation initiale',
    description: 'Apprentissage des techniques de réalisation, finition et valorisation du tapis artisanal.',
    duration: 'Selon le parcours',
    level: 'Certificat d apprentissage professionnelle',
    requirements: ['Intérêt pour le textile', 'Patience et précision'],
    skills: ['Préparation des fils', 'Techniques de nouage', 'Finition du tapis'],
    opportunities: ['Atelier de tapis', 'Coopérative artisanale', 'Production textile artisanale'],
    image: '/images/CFMA-img11.jpg',
    isPublished: true
  },
  {
    title: 'Bijouterie',
    slug: 'bijouterie',
    sector: 'metaux',
    type: 'Formation initiale',
    description: 'Creation de bijoux combinant creativite artistique et competences techniques.',
    duration: 'Selon le parcours',
    level: 'Specialisation professionnelle',
    requirements: ['Precision', 'Sens artistique'],
    skills: ['Conception', 'Assemblage', 'Finition bijoux'],
    opportunities: ['Bijouterie artisanale', 'Atelier creatif', 'Vente directe'],
    image: '/images/CFMA-img16.jpg',
    isPublished: true
  }
];

export const news = [
  {
    title: 'Ateliers d accompagnement des laureats',
    slug: 'ateliers-accompagnement-laureats',
    excerpt: 'Des ateliers pour renforcer l insertion professionnelle et l entrepreneuriat des laureats.',
    content:
      'Le centre organise des ateliers avec des partenaires institutionnels et economiques pour accompagner les laureats dans leur integration au marche de l emploi et dans la creation de projets durables.',
    coverImage: '/images/CFMA-img7.jpg',
    category: 'Accompagnement',
    status: 'published',
    publishedAt: '2024-06-01'
  },
  {
    title: 'Valorisation des savoir-faire artisanaux',
    slug: 'valorisation-savoir-faire-artisanaux',
    excerpt: 'Focus sur les métiers d artisanat transmis au sein du centre.',
    content:
      'Les formations du CFQMA Salé contribuent à sauvegarder les savoir-faire liés aux métiers de l artisanat et à encourager l insertion des jeunes.',
    coverImage: '/images/CFMA-img6.jpg',
    category: 'Formation',
    status: 'published',
    publishedAt: '2024-05-15'
  }
];

export const galleryItems = [
  { title: 'Atelier de formation', imageUrl: '/images/CFMA-img7.jpg', alt: 'Apprentis en atelier au CFQMA Salé', category: 'Ateliers', description: 'Espace de formation pratique.', isPublished: true },
  { title: 'Travail textile', imageUrl: '/images/CFMA-img14.jpg', alt: 'Formation textile au CFQMA Salé', category: 'Textile', description: 'Activités liées au textile.', isPublished: true },
  { title: 'Maroquinerie', imageUrl: '/images/CFMA-img10.jpg', alt: 'Formation maroquinerie', category: 'Cuir', description: 'Travail du cuir.', isPublished: true },
  { title: 'Menuiserie', imageUrl: '/images/CFMA-img2.jpg', alt: 'Formation menuiserie', category: 'Bois', description: 'Travail du bois.', isPublished: true },
  { title: 'Poterie', imageUrl: '/images/CFMA-img3.jpg', alt: 'Formation poterie', category: 'Pierre et argile', description: 'Creation artisanale en argile.', isPublished: true },
  { title: 'Vannerie', imageUrl: '/images/vannerie.jpg', alt: 'Formation vannerie', category: 'Produits vegetaux', description: 'Tressage de fibres vegetales.', isPublished: true }
];

export const stats = [
  { label: 'Capacité d accueil', value: '300' },
  { label: 'Pratique en apprentissage', value: '80%' },
  { label: 'Familles de métiers', value: '6' },
  { label: 'Formations référencées', value: '16+' }
];

export const centerFacts = [
  { label: 'Inauguration', value: '28 juillet 2012 / 8 Ramadan 1433' },
  { label: 'Financement', value: 'Fondation Mohammed V pour la Solidarité' },
  { label: 'Investissement', value: '13 millions MAD' },
  { label: 'Capacité', value: '300 apprentis' },
  { label: 'Public cible', value: 'Jeunes de 15 à 30 ans' },
  { label: 'Modèle pédagogique', value: '80% pratique / 20% théorie' }
];

export const centerObjectives = [
  'Formation par apprentissage dans le secteur de l artisanat',
  'Formation continue au profit des artisans',
  'Sauvegarde des savoirs et savoir-faire liés aux métiers de l artisanat en voie de disparition',
  'Encouragement de la culture d entrepreneuriat chez les jeunes',
  'Développement du produit artisanal',
  'Suivi des lauréats et aide à leur insertion professionnelle'
];

export const trainingTypes = [
  {
    title: 'Formation Initiale',
    description: 'Formation par apprentissage destinée aux jeunes, avec un modèle basé sur 80% de pratique et 20% de théorie.',
    points: ['Formation par apprentissage', '80% pratique', '20% théorique', 'Insertion sociale et économique']
  },
  {
    title: 'Formation Continue',
    description: 'Parcours destinés aux artisans de la région Rabat-Salé-Kénitra pour renforcer les compétences et développer le produit artisanal.',
    points: ['Artisans de la région Rabat-Salé-Kénitra', 'Renforcement des compétences', 'Développement du produit artisanal']
  }
];

export const trainingLevels = [
  { code: 'DQP', label: 'Diplôme de Qualification Professionnelle' },
  { code: 'DSP', label: 'Diplôme de Spécialisation Professionnelle' },
  { code: 'CAP', label: 'Certificat d Apprentissage Professionnelle' }
];

export const mainTrainingFields = [
  'Couture traditionnelle',
  'Couture moderne',
  'Tapisserie',
  'Tapis',
  'Menuiserie',
  'Sculpture sur bois',
  'Ferronnerie d art',
  'Menuiserie d aluminium',
  'Vannerie',
  'Poterie',
  'Zellige traditionnel',
  'Sculpture sur plâtre',
  'Maroquinerie'
];

export const accompanimentActions = [
  {
    title: 'Insertion professionnelle',
    description: 'Accompagnement des lauréats vers le marché du travail et suivi de leur intégration professionnelle.'
  },
  {
    title: 'Ateliers avec partenaires',
    description: 'Organisation d ateliers avec ANAPEC, CIH Bank Salé, Banque Populaire Salé, ODCO et Maroc PME.'
  },
  {
    title: 'Programme PIAE',
    description: 'Programme d Insertion par les Activités Économiques pour appuyer les jeunes porteurs de projets.'
  },
  {
    title: 'Soutien sur deux ans',
    description: 'Accompagnement des jeunes porteurs de projets pendant deux ans, avant et après la création de leur activité.'
  },
  {
    title: 'Coaching et gestion',
    description: 'Formation, coaching et accompagnement managérial par des professionnels, notamment Maroc PME et GIZ.'
  },
  {
    title: 'Équipement et activité durable',
    description: 'Appui de la Fondation Mohammed V à travers l équipement et le développement d activités économiques durables.'
  }
];

export const admissionSteps = [
  'Choisir une formation et vérifier le niveau adapté: DQP, DSP ou CAP.',
  'Déposer une demande de pré-inscription avec les informations personnelles et la formation souhaitée.',
  'Attendre le traitement administratif et la prise de contact du centre.',
  'Compléter le dossier demandé par l administration du centre.',
  'Intégrer le parcours de formation selon le calendrier communiqué.'
];

export const faqItems = [
  {
    question: 'À qui s adresse la formation initiale?',
    answer: 'Elle s adresse principalement aux jeunes de 15 à 30 ans souhaitant se qualifier dans les métiers de l artisanat.'
  },
  {
    question: 'Quelle est la différence entre formation initiale et formation continue?',
    answer: 'La formation initiale concerne les parcours par apprentissage. La formation continue concerne les artisans de la région Rabat-Salé-Kénitra.'
  },
  {
    question: 'Quel est le modèle pédagogique?',
    answer: 'La formation par apprentissage repose sur 80% de pratique et 20% de théorie.'
  },
  {
    question: 'Comment suivre une demande de pré-inscription?',
    answer: 'Le suivi en ligne doit être confirmé par l administration. En attendant, le candidat peut contacter le centre par téléphone ou email.'
  }
];
