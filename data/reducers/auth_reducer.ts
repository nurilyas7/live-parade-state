
import {
  Auth,
  AuthState,
  AuthAction,
  SignInCredentials
} from '../../data/states/auth_state';
import { ACTION_ROOT, Action } from '../../data/store';

const initialState: Auth = {
  state: AuthState.INITIALIZED
};

export const auth = (state: Auth = initialState, rootAction: Action): Auth => {
  if (rootAction.root === ACTION_ROOT.RESET) return initialState;
  if (rootAction.root !== ACTION_ROOT.AUTH) return state;

  const action = rootAction as AuthAction;

  switch (action.type) {
    case AuthState.REQUEST_SIGN_IN:
      return {
        state: AuthState.REQUEST_SIGN_IN,
        payload: action.payload as SignInCredentials
      };

    case AuthState.REQUEST_SIGN_OUT:
      return { state: AuthState.REQUEST_SIGN_OUT };

    default:
      return action.payload
        ? { state: action.type, payload: action.payload }
        : state;
  }
};
