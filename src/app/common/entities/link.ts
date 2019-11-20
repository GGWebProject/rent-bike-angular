import {ILink} from '../interfaces/ilink';

export class Link implements ILink {
  constructor(
    public link: string,
    public label: string
  ) {}
}
