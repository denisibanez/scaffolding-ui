// FILE: main.js

import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Notify, Quasar } from 'quasar';
import router from './router/routes';
import { createPinia } from 'pinia';
import i18n from './locales';

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css';
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css';
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css';
import '@quasar/extras/mdi-v6/mdi-v6.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import '@quasar/extras/themify/themify.css';
import '@quasar/extras/line-awesome/line-awesome.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue';

const myApp = createApp(App);

// Quasar
myApp.use(Quasar, {
  plugins: {
    Notify,
  }, // import Quasar plugins and add here
});

// Services
myApp.use(VueAxios, axios);

// router and Guard
router.beforeEach((to: any, from: any, next: any) => {
  const authVerificate = to.matched.some(
    (record: any) => record.meta.requiresAuth
  );
  const visitorsVeficate = to.matched.some(
    (record: any) => record.meta.requiresVisitor
  );
  const loggedIn = localStorage.getItem('ACCESS_TOKEN');
  if (authVerificate) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!loggedIn) {
      window.location.replace(`${process.env.VITE__BASE_APP}login`);
    } else {
      next();
    }
  } else if (visitorsVeficate) {
    if (loggedIn) {
      window.location.replace('/');
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

myApp.use(router);

// Store
const pinia = createPinia();
myApp.use(pinia);

// I18n
myApp.use(i18n);

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app');
