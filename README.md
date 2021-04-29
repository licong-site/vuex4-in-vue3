# Vue 3 + Typescript + Vite + Vuex

1. yarn create @vitejs/app   选择vue  typescript

2. yarn add vuex@next --save

## vuex + ts

vuex + vite + typescript  getter 获取的值未获得类型推到，得到的是 any 


## 函数式优化

store/modules/user 下有5个文件：

- index.ts
- constant.ts
- store.ts
- actions.ts
- mutations.ts

```js
// store/modules/user/store.ts
export const createState = () => {
  const store = {
    loading: true;
  };
  return store;
}

// 类型推导
export type userState = ReturnType<typeof createState>;
```

```js
// store/modules/user/constant.ts

const GET_DATA = 'GET_DATA';
export { GET_DATA };


```

```js
// store/modules/user/actions.ts
import { GET_DATA } from './constant';
import { ActionContext } from 'vuex';
import { userState } from './store';

export default {
  [GET_DATA]({commit}: ActionContext<UserState, unknown>): void {
  	// 异步请求数据
	},
}

```

```js
// store/modules/user/mutations.ts
import { GET_DATA } from './constant';
import { userState } from './store';

const mutations = {
  [GET_DATA](state: userState, payload: boolean): void{
    console.log('mutations执行成功')；
    state.loading = payload;
  },
}

export default mutations; 
```

使用函数式，方便组装，

避免使用装饰器，面向对象，引入类

```js
// store/modules/user/getters.ts
const moduleGetters = {
  isLogin: (state: userState): string => {
  	return state.loading;
	}
}

export default moduleGetters;
```



```js
// store/modules/user/index.ts
import { createState } from './store';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const state = createState();
export default {
	namespaced: true,
  state,
  getters,
  mutations,
  actions
}
```

```js
// store/modules.ts  处理 modules

import user from './modules/user';
// import role from './modules/role';

const modules = {
  user,
 //  role,
};

export { modules };
```

```typescript
// store/index.ts 创建 Vuex
import { createStore } from 'vuex';
import { modules } from './modules';
import { userState } from './modules/user/store';

type State = {
  user: userState,
}

const store = createStore<State>({
  modules,
});

export { State }; // 导出类型定义

export default store;

```

在 main.ts  中注册store

```ts
// main.ts 
import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index.ts';

createApp(APP).use(store).mount('#app');
```



在 HelloWorld 组件中使用 store

```vue
<script setup lang="ts">
  import { useStore } from 'vuex';
  import type { State } from '/src/store'; // 一定要加 type ！！！！
  
  const { state： myState, getters } = useStore<State>();
  console.log('vuex数据', myState.user.loading); // state 类型推导过程 ！！！！
  console.log('getters', getters.user.isLogin); // 报错,  user 是 undefined
  
  // 神奇的正确写法 --》 手写 hooks
  console.log('getters', getters['user/isLogin']);
</script>
```

为了正确推导 getters 的类型，需要自己手写 hooks , 文件夹 src/hooks

src/hooks/use-store.ts

```typescript
// src/hooks/use-store.ts
import { useStore } from 'vuex';
import type { State } from '/src/store';

// 修正类型
interface IUserYdStore {
  state: State;
  getters: any; // TODO
}

const userYdStore = (): IUserYdStore => {
  const { state, getters }: IUserYdStore = useStore<State>();
  return { state, getters };
};


// 同时写两种导出方式，方便用户调用
export {
	userYdStore
};
export default userYdStore;


```

src/hooks/index.ts

```typescript
// src/hooks/index.ts
export { userYdStore } from './use-store.ts';


```

在 HelloWorld 组件中使用 hooks 

```vue
<script setup lang="ts">
  import { useStore } from 'vuex';
  import { userYdStore } from '/src/hooks'; 
  
  const { state, getters } = userYdStore();
  console.log('vuex数据', myState.user.loading); 
  console.log('getters', getters.user.isLogin); 
</script>
```

技术： css  next  jest TDD  BDD recoil  CI  CD



src/store/utils.ts  推导 getter 的类型

```typescript
// src/store/utils.ts

/** 目的
{
	'user/isLogin': number,
}
1.  取到每一个 namespace 中核心的 getters
2. user/isLogin
3. user.isLogin 的 returnType 取出来
*/

import { modules } from './modules';

type GetGetter<Module> = Module extends { getters: infer G } ? G : unknown;

type GetGetters<Modules> = {
  [K in keyof Modules]: GetGetter<Modules[K]>;
};

type YdGetters = GetGetters<typeof modules>; // 拿到 modules 里面所有的属性类型
                            
type Addprefix<P, K> = `${P & string}/${K & string}`; // & 类型合并，限制 P, K 是string类型

type GetSpliceKey<P, Module> = Addprefix<P, keyof Module>;
type GetSpliceKeys<Modules> = {
  [K in keyof Modules]: GetSpliceKey<K, Modules[K]>;
}[keyof Modules];

type GetFunc<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]];

type GetSpliceObj<T> = {
  [K in GetSpliceKeys<T>]: K extends `${infer A}/${infer B}` ? GetFunc<T, A, B> : unknown;
};

type ModuleGetters = GetSpliceObj<YdGetters>;
type Getters = {
  [K in keyof ModuleGetters]: ReturnType<ModuleGetters[K]>;
};


export { Getters };

```

-----



## 使用装饰器 vuex-module-decorators

yarn add vuex-module-decorators

```json
{
	compilerOptions: {
		...
		"experimentalDecorators": true,
		"importHelpers": true,
	}
}
```
热更新时，只重新加载修改的文件，不修改 store 文件， 不会重新注册 module，重新注册会报错 

重复的 namepace 和 getter。会注册两个同名的module，调用方法会执行两次。

![image-20210428211321362](C:\Users\licong\Desktop\assets\image-20210428211321362.png)

其他热更新的 model状态不受影响，



Vite 热更新的模块的依赖中包含  store的就会重新加载， 也就会重新注册模块



vite会把循环依赖的内容置空,已经给vite提issue, 所以对于循环依赖的store会在热更新时被清空

```ts
import store from '/@/store';

export function hotModuleUnregisterModule(name: string) {
  if (!name) return;
  if ((store.state as any)[name]) {
    store.unregisterModule(name);
  }
}

```



```ts
{
        name: 'singleHMR',
        handleHotUpdate({ modules, file }) {
          if (file.match(/xml$/)) return [];

          // 清掉所有依赖注入
          modules.map((m) => {
            m.importedModules = new Set()
            m.importers = new Set()
          });

          return modules;
        },
      },
```




## pinia 
pinia 于 vuex5api 基本类似，且简单易懂。
后续切换 vuex5 成本非常低，也可以当作第三方状态管理库使用
