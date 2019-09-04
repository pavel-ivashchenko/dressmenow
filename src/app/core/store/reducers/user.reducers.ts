
import { EUserActions, UserActions } from '@app/core/store/actions/user.actions';
import { initUserState, IUserState } from '@app/core/store/state';

export function userReducers (
    state = initUserState,
    action: UserActions
  ): IUserState {
  switch (action.type) {
    case EUserActions.SetUser: {
      return action.payload;
    }
    default: return state;
  }
}
