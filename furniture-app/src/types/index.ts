export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}
