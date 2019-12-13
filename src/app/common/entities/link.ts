import {ILink} from '../interfaces/ilink';

export class Link implements ILink {
  constructor(
    public url: string,
    public label: string
  ) {}
}
