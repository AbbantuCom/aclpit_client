// ─── Content types ──────────────────────────────────────────────────────────
// Duplicated from the aclpit_admin_api repo's types/index.ts (the "content"
// subset only — AdminUser/Invitation/ContactSubmission are admin-only and not
// needed here). THE ADMIN REPO IS THE SOURCE OF TRUTH: if its shapes change,
// mirror the change here by hand.

export interface HeroContent {
  kicker: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  image: string;
  visionLabel: string;
  visionText: string;
}

export interface AboutObjective {
  icon: string;
  title: string;
  description: string;
}

export interface AboutStakeholder {
  icon: string;
  title: string;
  description: string;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  image: string;

  backgroundEyebrow: string;
  backgroundTitle: string;
  backgroundParagraph1: string;
  backgroundParagraph2: string;
  backgroundParagraph3: string;
  backgroundImage: string;

  visionText: string;
  missionText: string;

  objectives: AboutObjective[];

  governanceEyebrow: string;
  governanceTitle: string;
  governanceParagraph1: string;
  governanceParagraph2: string;
  governanceValues: string[];
  governanceImage: string;

  stakeholders: AboutStakeholder[];
}

export interface ServiceItem {
  id: string;
  anchor: string;
  icon: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  order: number;
}

export interface PracticeArea {
  id: string;
  anchor: string;
  icon: string;
  title: string;
  description: string;
  bullets: string[];
  order: number;
}

export interface PublicationItem {
  id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  coverImage: string;
  date: string;
  order: number;
}

export interface DialogueItem {
  id: string;
  youtubeUrl: string;
  title: string;
  description: string;
  category: string;
  order: number;
}

export interface ContactSocials {
  linkedin: string;
  twitter: string;
  youtube: string;
  facebook: string;
}

export interface ContactContent {
  title: string;
  subtitle: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  postalAddress: string;
  officeHours: string;
  mapEmbedUrl: string;
  socials: ContactSocials;
  topics: string[];
}

export interface FooterContent {
  description: string;
  copyrightName: string;
}

export type ContentSection =
  | 'hero'
  | 'about'
  | 'services'
  | 'practiceAreas'
  | 'publications'
  | 'dialogues'
  | 'contact'
  | 'footer';
