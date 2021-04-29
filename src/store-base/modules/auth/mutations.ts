import { AuthState } from "./state";

const mutations = {
  addRole (state: AuthState, payload: {id: number, name: string}) {
    state.role.push(payload);
  }
};

export default mutations;