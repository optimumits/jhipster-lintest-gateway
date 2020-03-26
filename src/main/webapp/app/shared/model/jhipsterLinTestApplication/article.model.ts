import { IAuthor } from 'app/shared/model/jhipsterLinTestApplication/author.model';

export interface IArticle {
  id?: string;
  title?: string;
  tag?: string;
  num?: number;
  authors?: IAuthor[];
}

export const defaultValue: Readonly<IArticle> = {};
