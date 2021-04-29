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
  <p>
    log: {{ logs }}
    <button @click="pushLog">添加log</button>
  </p>

  <button @click="count++">count is: {{ count }}</button>
</template>

<script lang="ts">
import { ref, defineComponent, computed, watchEffect } from 'vue';
import { userStore } from '../store-decorator/modules/user';
import { authStore } from '../store-decorator/modules/auth';

export default defineComponent({
  name: 'UseDecoratorStoreComponent',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const count = ref(0);
    
    watchEffect(() => {
      console.log('authStore', authStore);
    })
  
    // state
    const role = computed(() => authStore.roleStr);
    const logs = computed(() => authStore.logs);

    // getter 
    const loginState = computed(() => userStore.loginState);
    
    // mutation
    const updateRole = () => authStore.fetchRole();

    const pushLog = () => authStore.pushLog('click');

    // action
    const doLogin = () => {
      userStore.loginAction && userStore.loginAction();
    };

    return {
      count,
      loginState,
      doLogin,
      role,
      updateRole,
      logs,
      pushLog,
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
