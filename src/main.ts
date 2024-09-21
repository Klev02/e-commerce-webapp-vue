import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { useStore } from './store';
import { STORE_NAME } from './constants';

const app = createApp(App);
const store = useStore();

app.use(router);
app.provide(STORE_NAME, store);

app.mount('#app');
