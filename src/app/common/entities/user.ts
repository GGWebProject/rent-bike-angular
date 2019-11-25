import {IUser} from '../interfaces';

export class User implements IUser {
  constructor(
    public readonly accessToken: string | null = null,
    public password: string | null = null,
    public email: string | null = null,
    public userName: string | null = null,
    public avatarUrl: string | null = null,
  ) {}
}
