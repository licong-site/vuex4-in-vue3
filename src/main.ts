import { createApp } from 'vue'
import App from './App.vue'
// import store from './store-base/index';
import store from './store-decorator/index';

const app = createApp(App);

app.use(store);

app.mount('#app');
