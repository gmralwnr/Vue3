import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import funcPlugins from './plugins/func';
import objPlugins from './plugins/obj';
import person from './plugins/person';
import globalComponents from '@/plugins/global-components';
//createApp(App).use(router).mount('#app');

const app = createApp(App);
app.use(funcPlugins);
app.use(objPlugins);
app.use(person, { name: '홍길동' });
app.use(globalComponents);
app.use(router);
app.mount('#app');
import 'bootstrap/dist/js/bootstrap.js';

// console.log('Mpde', import.meta.env.MODE); //현재 구동 되는 모드가 개발 모드인지 아닌지 출력하는 환셩변수
// console.log('BASE_URL', import.meta.env.BASE_URL);
// console.log('PROD', import.meta.env.PROD); //프로덕트 모드는 false 아니면 투르??
// console.log('DEV', import.meta.env.DEV); //개발 모드라면 트루 아니면 false
// console.log('VITE_APP_API_URL', import.meta.env.VITE_APP_API_URL);
