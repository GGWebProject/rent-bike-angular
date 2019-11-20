import {IUser} from '../interfaces/iuser';

export class User implements IUser {
  constructor(
    public name: string = '',
    public token: string = '',
    public avatarUrl: string = '',
  ) {}
}
