export interface iAboutModel {
  greeting: string;
  intro: string;
  skills: iAboutSkill[];
  contacts: iAboutContact[];
  image: string;
  cvUrl: string;
  socials: iSocialLink[];
  technologies: iTechnology[];
}

export interface iAboutSkill {
  label: string;
  value: string;
}

export interface iAboutContact {
  label: string;
  value: string;
}

export interface iSocialLink {
  icon: string; // ex: 'fab fa-linkedin-in'
  url: string;
}

export interface iTechnology {
  icon: string; // chemin svg ou img
  alt: string;
  type?: 'img' | 'svg';
}
