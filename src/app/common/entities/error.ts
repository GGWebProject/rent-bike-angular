import {IError} from '../interfaces/ierror';

export class Error implements IError {
  constructor(
    public type: string = '',
    public errorMessage: string = '',
  ) {}
}
