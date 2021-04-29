import { createStore } from 'vuex';
import { UserState } from './modules/user/state';
import { AuthState } from './modules/auth/state';
import { modules } from './modules';

export type State = {
  user: UserState,
  auth: AuthState,
}

const store = createStore<State>({
  modules
});

export default store;
