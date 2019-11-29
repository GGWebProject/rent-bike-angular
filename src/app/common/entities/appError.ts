import {IAppError} from '../interfaces/iappError';

export class AppError implements IAppError {
  constructor(
    public errorType: string = '',
    public errorMessage: string = '',
  ) {}
}
