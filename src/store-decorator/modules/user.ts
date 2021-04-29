import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '../index';

// 必须设置 dynamic: true， 否则在组件中调用 Mutation，Action 装饰的方法时会报错
@Module({ dynamic: true, name: 'user', store, namespaced: true })
class UserStore extends VuexModule {
  count = 0;
  isLogin = false;

  get doubleCount () {
    return this.count * 3;
  }

  get loginState () {
    return this.isLogin ? 'LOGIN' : 'LOGOUT';
  }

  @Mutation
  increment(delta: number) {
    this.count += delta
  }

  @Mutation
  login () {
    this.isLogin = true;
  }

  @Action
  fetchCount () {
    setTimeout(() => {
      this.increment(999);
    }, 50);
  }

  @Action
  loginAction () {
    setTimeout(() => {
      this.login();
    }, 50);
  }
}

export const userStore = getModule<UserStore>(UserStore);
