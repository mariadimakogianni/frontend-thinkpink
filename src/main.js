import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import all solid icons
import { far } from '@fortawesome/free-regular-svg-icons'; // Import all regular icons
//import axios from 'axios';
import Keycloak from 'keycloak-js';

// Initialize Keycloak
const keycloak = new Keycloak({
  url: 'http://localhost:8081',
  realm: 'ThinkPink',
  clientId: 'thesis-thinkpink'
});

window.keycloak = keycloak; //keycloak instance globally available

// Activity and refresh settings
let activityTimeout;
let refreshInterval;
const ACTIVITY_TIMEOUT = 90000; 
const REFRESH_INTERVAL = 20000; 

// Add all solid and regular icons to the library
library.add(fas, far);
loadFonts();

// Keycloak initialization
keycloak.init({
  onLoad: 'login-required',
  checkLoginIframe: false,
  promiseType: 'native',
}).then((authenticated) => {
  if (authenticated) {
    console.log('User authenticated successfully');
    
    if (keycloak.token) {
      console.log('Initial token obtained:', keycloak.token);
      console.log("assignedUser", keycloak.tokenParsed.assigned_user_name);

      // Create an auth object
      const auth = {
        token: keycloak.token,
        idToken: keycloak.idToken,
        refreshToken: keycloak.refreshToken,
        username: keycloak.tokenParsed.preferred_username,
        userId: keycloak.tokenParsed.sub,
        firstName: keycloak.tokenParsed.given_name,  
        lastName: keycloak.tokenParsed.family_name,  
        email: keycloak.tokenParsed.email,         
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + keycloak.token,
        }
      };

      keycloak.tokenParsed.is_caregiver &&  (auth.isCaregiver=keycloak.tokenParsed.is_caregiver);
      auth.isCaregiver && (auth.assignedUser=keycloak.tokenParsed.assigned_user, auth.assignedUserName = keycloak.tokenParsed.assigned_user_name);

      console.log("auth",auth);
      console.log("ass user name", auth.assignedUserName)

      store.commit('setKeycloak', keycloak);

      // Create the app instance
      const app = createApp(App)
        .use(router)
        .use(store)
        .use(vuetify)
        .component('font-awesome-icon', FontAwesomeIcon);

      // Provide auth and API globally
      store.commit('setAuth', auth);
      app.config.globalProperties.$auth = auth;

      
      // Mount the app
      app.mount('#app');
      
      console.log('App has been mounted successfully');

      // Start global activity tracking for token refresh
      startGlobalActivityTracking();
      startTokenRefresh();

    } else {
      console.error('Failed to retrieve initial token');
    }
  } else {
    window.location.reload(); // Redirect to login if not authenticated
  }
}).catch((error) => {
  console.error('Failed to initialize Keycloak', error);
});

// Function to start global activity tracking
function startGlobalActivityTracking() {
  console.log('Global activity tracking has started');
  
  // Add global event listeners for user activity
  document.addEventListener('mousemove', handleUserActivity);
  document.addEventListener('keypress', handleUserActivity);
  document.addEventListener('click', handleUserActivity);
  document.addEventListener('scroll', handleUserActivity);

  // Initialize the activity timer
  resetActivityTimer();
}

// Function to handle user activity
function handleUserActivity() {
  resetActivityTimer();

  // If the token refresh was stopped, restart it
  if (!refreshInterval) {
    console.log('User activity detected, restarting token refresh');
    startTokenRefresh();
  }
}

// Function to reset the activity timer
function resetActivityTimer() {
  console.log('User activity detected, resetting timer');
  clearTimeout(activityTimeout);

  // Set a new timeout for tracking user inactivity
  activityTimeout = setTimeout(() => {
    console.log('User inactive for 30 seconds, stopping token refresh');
    stopTokenRefresh(); // Stop refreshing the token when inactive
  }, ACTIVITY_TIMEOUT);
}

// Function to start periodic token refresh
function startTokenRefresh() {
  // Clear any existing refresh intervals
  clearInterval(refreshInterval);

  // Start a new interval for refreshing the token
  refreshInterval = setInterval(() => {
    if (activityTimeout) {
      console.log('Refreshing token as user activity was detected within the last 30 seconds');
      refreshToken();
    } else {
      console.log('No recent user activity, token refresh will not run');
    }
  }, REFRESH_INTERVAL);
}

// Function to stop the token refresh interval
function stopTokenRefresh() {
  clearInterval(refreshInterval);
  refreshInterval = null; // Ensure the interval is cleared
}

// Function to refresh the token
// function refreshToken() {
//   keycloak.updateToken(30) // Refresh if token will expire in 30 seconds
//     .then((refreshed) => {
//       if (refreshed) {
//         console.log('Token refreshed successfully:', keycloak.token);
//         store.commit('setAuth', {
//           ...store.state.auth,
//           token: keycloak.token,
//           refreshToken: keycloak.refreshToken,
//           headers: {
//               'Content-Type': 'application/json',
//               'Authorization': "Bearer " + keycloak.token,
//             },
//         });
//       } else {
//         console.log('Token is still valid, no refresh needed');
//       }
//     })
//     .catch(() => {
//       console.error('Failed to refresh the token, logging out');
//       keycloak.logout();
//     });
// }

async function refreshToken() {
      try {
        const refreshed =  await keycloak.updateToken(30);
        if (refreshed) {
          console.log('Token was refreshed in refreshToken action');
          console.log('Token refreshed successfully:', keycloak.token);

          store.commit('setAuth', {
             ...store.state.auth,
            token: keycloak.token,
            refreshToken: keycloak.refreshToken,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + keycloak.token,
            },
          });
        } else {
          console.log('Token is still valid, no refresh needed');
        }
      } catch (error) {
        console.error('Failed to refresh token', error);
        keycloak.logout();
      }
  }
