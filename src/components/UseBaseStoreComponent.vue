<template>
  <h1>{{ msg }}</h1>

  <p>
    用户（UserStore）：
  </p>

  <p>
    loginState: {{ loginState }}
    <button @click="doLogin">登录</button>
  </p>

  <p>
    权限（AuthStore）：
  </p>
  <p>
    role: {{ role }}
    <button @click="updateRole">添加角色</button>
  </p>

  <button @click="count++">count is: {{ count }}</button>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { State } from '../store-base';

export default defineComponent({
  name: 'UseBaseStoreComponent',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const count = ref(0);

    const { state, getters, commit, dispatch } = useStore<State>();
  
    // state
    const role = computed(() => state.auth.role);

    // getter  无法推到获取 loginState的类型
    const loginState = computed(() => getters['user/loginState']);
    
    // mutation
    const updateRole = () => commit('auth/addRole', {id: 333, name: '管理员'});

    // action
    const doLogin = () => dispatch('user/loginAction');

    return {
      count,
      loginState,
      doLogin,
      role,
      updateRole,
    }
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
