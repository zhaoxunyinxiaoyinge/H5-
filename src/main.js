import { createApp } from 'vue';
import App from './App.vue';
import Vant from 'vant';
import { router } from "@/router/index"
import VConsole from 'vconsole';
new VConsole();
import "./assets/reset.css";
import "./assets/common.css";
import 'vant/lib/index.css';
import './utils/index.js';
import {store} from "./store/index.js";

import { List, PullRefresh } from 'vant';
createApp(App).use(router).use(Vant).use(List).use(PullRefresh).use(Vant.Lazyload).use(store).mount('#app');

