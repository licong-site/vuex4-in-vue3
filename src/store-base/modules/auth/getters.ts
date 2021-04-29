import { AuthState } from "./state";

const moduleGetters = {
  roleStr (state: AuthState) {
    return state.role.join('; ');
  }
};

export default moduleGetters;
