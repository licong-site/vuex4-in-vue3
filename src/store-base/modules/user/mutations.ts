import { UserState } from "./state";

const mutations = {
  increment (state: UserState) {
    state.count++;
  },
  login (state: UserState) {
    state.isLogin = true;
  }
};

export default mutations;