import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type RHeaderProps = {
  name: string;
  subtitle: string;
  contactLinks: RContactLink[];
};

export type RContactLink = {
  icon: IconDefinition;
  href: string;
  print?: React.ReactNode | string;
  screen: string;
};

export type RAddressProps = {
  icon: IconDefinition;
  href: string;
  children: any;
};

export type RMainProps = {
  experience: RExperience[];
  experienceCaption?: string;
  education: REducation;
};

export type RExperience = {
  company: {
    name: string;
    href: string;
  };
  position: {
    title: string;
    range: string;
    description?: React.ReactNode;
  };
};

export type REducation = {
  school: string;
  degree: string;
  range: string;
  subitems: Array<{
    heading: string;
    points: string[];
  }>;
};

export type ResumeProps = {
  name: RHeaderProps['name'];
  subtitle: RHeaderProps['subtitle'];
  contactLinks: RHeaderProps['contactLinks'];
  experience: RMainProps['experience'];
  experienceCaption: RMainProps['experienceCaption'];
  education: RMainProps['education'];
};
