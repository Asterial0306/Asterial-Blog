export interface Video {
  id: string;
  title: string;
  description: string;
  cover: string;
  category: string;
  transcript: string;
  date: string;
  tags: string[];
  links: VideoLink[];
}

export interface VideoLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  cover: string;
  content: string;
  date: string;
  tags: string[];
  category: string;
}

export interface NavItem {
  label: string;
  href: string;
}
