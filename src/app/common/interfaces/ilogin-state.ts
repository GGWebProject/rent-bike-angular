import { User } from '../entities/user';

export interface ILoginState {
  isLogin: boolean;
  accessToken: string | null;
  user: User | null;
}
