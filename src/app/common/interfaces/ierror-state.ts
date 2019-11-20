import {IError} from './ierror';

export interface IErrorState {
  isError: boolean;
  error: IError | null;
}
