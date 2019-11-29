import {IAppError} from './iappError';

export interface IErrorState {
  isError: boolean;
  appError: IAppError | null;
}
