import { connectDB } from '../config/db.js';
import { PageContent } from '../models/PageContent.js';
import { Partner } from '../models/Partner.js';
import { SiteSettings } from '../models/SiteSettings.js';

const settings = {
  singletonKey: 'main',
  phoneNumbers: ['+212 537 88 29 27', '+212 661 87 59 73'],
  email: 'cfqma2012@gmail.com',
  address: 'Avenue Mohammed VI, route de Kénitra, Salé',
  facebookUrl: 'https://www.facebook.com/cfqma.sale',
  instagramUrl: 'https://www.instagram.com/cfqmas',
  openingHours: '',
  mapEmbedUrl:
    'https://www.google.com/maps?q=CFQMA%20Sal%C3%A9%20Centre%20de%20Formation%20et%20de%20Qualification%20dans%20les%20M%C3%A9tiers%20d%27Artisanat%20Sal%C3%A9&output=embed',
  defaultLanguage: 'fr'
};

const partners = [
  {
    name: 'Fondation Mohammed V pour la Solidarité',
    logo: '/images/logo.svg',
    url: 'https://www.fm5.ma/',
    alt: 'Logo Fondation Mohammed V pour la Solidarité',
    order: 1,
    isPublished: true
  },
  {
    name: "Ministère de l'Artisanat",
    logo: '/images/mda-ar.png',
    url: 'https://mtaess.gov.ma/',
    alt: "Logo du Ministère de l'Artisanat",
    order: 2,
    isPublished: true
  },
  {
    name: 'ANAPEC',
    logo: '/images/anapec.png',
    url: 'https://anapec.ma/',
    alt: 'Logo ANAPEC',
    order: 3,
    isPublished: true
  },
  {
    name: 'CIH Bank',
    logo: '/images/cih.png',
    url: 'https://www.cihbank.ma/',
    alt: 'Logo CIH Bank',
    order: 4,
    isPublished: true
  },
  {
    name: 'Banque Populaire',
    logo: '/images/bank.png',
    url: 'https://www.groupebcp.com/',
    alt: 'Logo Banque Populaire',
    order: 5,
    isPublished: true
  },
  {
    name: 'ODCO',
    logo: '/images/odco.png',
    url: 'https://www.odco.gov.ma/',
    alt: 'Logo ODCO',
    order: 6,
    isPublished: true
  },
  {
    name: 'Maroc PME',
    logo: '/images/pme.png',
    url: 'https://marocpme.gov.ma/',
    alt: 'Logo Maroc PME',
    order: 7,
    isPublished: true
  },
  {
    name: 'GIZ',
    logo: '/images/giz.png',
    url: 'https://www.giz.de/en/regions/africa/morocco',
    alt: 'Logo GIZ',
    order: 8,
    isPublished: true
  }
];

const pageContents = [
  {
    pageKey: 'home',
    locale: 'fr',
    sections: [
      { key: 'facts', title: 'Chiffres clés', items: ['2012', '300 apprentis', '80% pratique / 20% théorie', '13 MDH'] },
      { key: 'cta', title: 'Actions principales', items: ['Voir les formations', 'Pré-inscription', 'Contact'] }
    ]
  },
  {
    pageKey: 'about',
    locale: 'fr',
    sections: [
      {
        key: 'presentation',
        title: 'Présentation du centre',
        body:
          'CFQMA Salé a été inauguré le 28 juillet 2012 par Sa Majesté le Roi Mohammed VI. Le centre vise la qualification et l’insertion sociale et économique des jeunes dans les métiers de l’artisanat.'
      }
    ]
  },
  {
    pageKey: 'admission',
    locale: 'fr',
    sections: [
      {
        key: 'steps',
        title: 'Parcours d’admission',
        items: [
          'Choisir une formation',
          'Déposer une demande de pré-inscription',
          'Attendre le traitement administratif',
          'Compléter le dossier demandé',
          'Intégrer le parcours de formation'
        ]
      }
    ]
  },
  {
    pageKey: 'accompagnement',
    locale: 'fr',
    sections: [
      {
        key: 'support',
        title: 'Accompagnement et insertion',
        items: ['Insertion professionnelle', 'Suivi des lauréats', 'Entrepreneuriat', 'Coaching', 'PIAE']
      }
    ]
  },
  {
    pageKey: 'faq',
    locale: 'fr',
    sections: [
      {
        key: 'questions',
        title: 'Questions fréquentes',
        items: [
          'À qui s’adresse la formation initiale ?',
          'Quelle est la différence entre formation initiale et formation continue ?',
          'Quel est le modèle pédagogique ?'
        ]
      }
    ]
  }
];

await connectDB();

const settingsResult = await SiteSettings.updateOne({ singletonKey: 'main' }, { $setOnInsert: settings }, { upsert: true });

let insertedPartners = 0;
for (const partner of partners) {
  const result = await Partner.updateOne({ name: partner.name }, { $setOnInsert: partner }, { upsert: true });
  if (result.upsertedCount) insertedPartners += result.upsertedCount;
}

let insertedPageContent = 0;
for (const content of pageContents) {
  const result = await PageContent.updateOne(
    { pageKey: content.pageKey, locale: content.locale },
    { $setOnInsert: content },
    { upsert: true }
  );
  if (result.upsertedCount) insertedPageContent += result.upsertedCount;
}

console.log(
  JSON.stringify({
    settingsInserted: settingsResult.upsertedCount || 0,
    partnersInserted: insertedPartners,
    pageContentInserted: insertedPageContent
  })
);
process.exit(0);
