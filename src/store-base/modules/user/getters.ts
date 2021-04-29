import { UserState } from "./state";

const moduleGetters = {
  doubleCount (state: UserState) {
    return state.count * 2;
  },
  loginState (state: UserState) {
    return state.isLogin ? 'LOGIN' : 'LOGOUT';
  }
};

export default moduleGetters;
