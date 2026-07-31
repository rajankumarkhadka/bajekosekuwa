export * from './api';
export * from './article';
export * from './category';
export * from './gallery';
export * from './vendorBranch';
export * from './testimonial';
export * from './contact';
export * from './menu';

export interface BranchBlog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author?: string;
  isGlobal?: boolean;
  customUrl?: string;
  category?: string;
}
