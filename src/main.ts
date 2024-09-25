import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initialState, useStore } from './store';
import { STORE_NAME } from './constants';
import { fallbackImageDirective } from './directives/v-fallback-image';

const app = createApp(App);
const store = useStore(initialState);

app.use(router);
app.provide(STORE_NAME, store);
app.directive('fallback-image', fallbackImageDirective);

app.mount('#app');
