import {createAction, props} from '@ngrx/store';
import {AppError} from '../../common/entities';

const ERROR_SET: string = '[Error] Set error';
const ERROR_REMOVE: string = '[Error] Remove error';

export const errorSet = createAction(ERROR_SET, props<{payload: AppError}>());
export const errorRemove = createAction(ERROR_REMOVE);
