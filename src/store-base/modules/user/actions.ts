import { ActionContext } from "vuex";
import { UserState } from "./state";

const actions = {
  fetchCount ({ commit }: ActionContext<UserState, unknown>) {
    setTimeout(() => {
      commit('increment', 999)
    }, 50);
  },
  loginAction ({ commit }: ActionContext<UserState, unknown>) {
    setTimeout(() => {
      commit('login')
    }, 50);
  },
};

export default actions;
