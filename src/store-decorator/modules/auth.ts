import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '../index';

type Role = {id: number, name: string, super?: boolean};

if (import.meta.hot) {
  console.log('vite 热更新');
}

console.log('进入模块')

@Module({ dynamic: true, name: 'auth', store, namespaced: true, })
class AuthStore extends VuexModule {
  role: Role|undefined = undefined;
  logs: string[] = [];

  get roleStr () {
    return this.role ? JSON.stringify(this.role) : '未知角色';
  }

  @Mutation
  pushLog(payload: string) {
    this.logs.push(payload);
  }

  @Action
  newLog(payload: string) {
    this.pushLog(payload);
  }

  @Mutation
  addRole(payload: Role) {
    this.role = payload;
  }

  @Action
  fetchRole () {
    setTimeout(() => {
      this.addRole({id: 111, name: '管理员'});
    }, 50);
  }
}

export const authStore = getModule<AuthStore>(AuthStore);
