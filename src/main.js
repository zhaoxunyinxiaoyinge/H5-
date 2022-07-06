import { createApp } from 'vue';
import App from './App.vue';
import Vant from 'vant';

import 'vant/lib/index.css';
import './utils/index.js'

let app=createApp(App).mount('#app');
app.use(Vant);
app.use(vant.Lazyload);

