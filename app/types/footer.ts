// types/footer.ts
export interface FooterLink {
  text: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterNewsletter {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
}

export interface FooterConfig {
  sections: FooterSection[];
  newsletter: FooterNewsletter;
  copyright: string;
}