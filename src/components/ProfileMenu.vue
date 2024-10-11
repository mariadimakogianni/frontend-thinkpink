<template>
  <div>
    <v-menu
      transition="scale-transition"
      :close-on-content-click="true"
      location="end"
      v-model="menu"
      class="profile-menu"
    >
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props" class="profile-button">
          <v-avatar v-if="this.$store.login_status" image="https://cdn.vuetifyjs.com/images/john.jpg"></v-avatar>
          <v-icon v-else >mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-card class="elegant-card text-center" min-width="150">
        <v-list density="compact">
          <v-list-header v-if="this.$store.login_status">Pete Sampras</v-list-header>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
        @click="logOut"
      >
      <div>
        <a v-text="item.text" class="pr-2"></a>
        <v-icon :icon="item.icon" size="x-small"></v-icon>
      </div>

      </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'ProfileMenu',
  data: () => ({
    menu: false,
    items:{login:{text:'Logout',icon:"mdi-login"}},
  }),
  methods: {
    doSomething(action) {
      console.log(`Doing something with ${action}`);
      // Your logic here
    },
    logOut(){
      var idToken = this.$store.getters.getAuth.idToken;
      var logoutUrl = 'http://localhost:8081/realms/ThinkPink/protocol/openid-connect/logout' +
                      '?id_token_hint=' + idToken +
                      '&post_logout_redirect_uri=http://localhost:8080';

      window.location.href = logoutUrl;

    },
  },
};
</script>

<style scoped>
.profile-button {
  /* Style the profile button */
}

.sleek-item {
  transition: background-color 0.3s ease;
}

.sleek-item:hover {
  background-color: #f0f0f0; /* Light grey background on hover */
}

.sleek-icon {
  color: grey; /* Change icon color */
}

</style>

