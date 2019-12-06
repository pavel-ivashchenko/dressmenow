
import { createFeatureSelector } from '@ngrx/store';
import { IAppState, IUserState } from '@app/core/store/state';

export const selectUserState = createFeatureSelector<IAppState, IUserState>('user');
