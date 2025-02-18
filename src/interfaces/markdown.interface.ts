export interface IMarkdown {
  id?: number;
  contentHtml: string;
  contentMarkdown: string;
  imgageUrl: string;
  title: string;
  hashtag: string[];
  description: string;
  user_id: number;
  category_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}

export type CreateMarkdownDto = Omit<IMarkdown, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateMarkdownDto = Partial<Omit<IMarkdown, 'id' | 'user_id'>>;