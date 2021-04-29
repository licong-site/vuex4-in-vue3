import { ActionContext } from "vuex";
import { AuthState } from "./state";

const actions = {
  fetchRole ({ commit }: ActionContext<AuthState, unknown>) {
    commit('addRole', {id: 111, name: '管理员'});
  }
};

export default actions;
