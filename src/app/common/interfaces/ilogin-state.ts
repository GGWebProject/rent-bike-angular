import { User } from '../entities/user';

export interface ILoginState {
  isLogin: boolean;
  user: User | null;
}
