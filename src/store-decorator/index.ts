import { createStore } from 'vuex';
import { config } from 'vuex-module-decorators';

config.rawError = true;

// export type State = {
//   user: UserState,
//   auth: AuthState,
// }

const store = createStore({
  strict: import.meta.env.DEV, // 生产环境下必须关闭严格模式
});

export default store;