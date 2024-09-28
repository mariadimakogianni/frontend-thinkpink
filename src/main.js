import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons' // Import all solid icons
import { far } from '@fortawesome/free-regular-svg-icons' // Import all regular icons
//import axios from 'axios';
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8081', // Keycloak URL
  realm: 'ThinkPink',                // Replace with your realm name
  clientId: 'thesis-thinkpink'          // Replace with your client ID
});

// Add all solid icons to the library
library.add(fas)

// Add all regular icons to the library
library.add(far)

loadFonts()

keycloak.init({
  onLoad: 'login-required', 
  checkLoginIframe: false,
  promiseType: 'native',
}).then((authenticated) => {
  console.log(authenticated);
  if (authenticated) {
    console.log('Authenticated');
    
    // Ensure token retrieval
    if (keycloak.token) {
      console.log('Token:', keycloak.token);

      // Create an auth object containing the user's information
      const auth = {
        token: keycloak.token,
        refreshToken: keycloak.refreshToken,
        username: keycloak.tokenParsed.preferred_username,
        userId: keycloak.tokenParsed.sub,
        roles: keycloak.tokenParsed.realm_access.roles
      };

      // Create the app instance
      const app = createApp(App)
        .use(router)
        .use(store)
        .use(vuetify)
        .component('font-awesome-icon', FontAwesomeIcon);

      // Provide auth object to all components
      app.provide('$auth', auth);

      console.log(auth);

      // Mount the app
      app.mount('#app');
      
      console.log('User authenticated:', auth);
      
    } else {
      console.error('Failed to retrieve token');
    }
  } else {
    window.location.reload(); // Redirect to the login page if not authenticated
  }
}).catch((error) => {
  console.error('Failed to initialize Keycloak', error);
});
