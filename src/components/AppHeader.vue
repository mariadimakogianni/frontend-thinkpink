<template>
  <v-app-bar
    :class="{'opaque': scrolled}"
    :color="getAppBarColor"
    :elevation="scrolled ? 4 : 0"
    app
    fixed
  >
    <v-app-bar-nav-icon v-if="userIsLoggedIn" @click="drawer = !drawer" :color="getIconColor"></v-app-bar-nav-icon>
    <v-toolbar-title class="mr-5" :style="titleStyle">SEXYCODERS</v-toolbar-title>
    <SearchBar v-if="showSearchBar" />
    <v-spacer></v-spacer>
    <v-btn icon :color="getIconColor">
      <!--<ProfileMenu />-->
    </v-btn>
  </v-app-bar>
</template>

<script>
import { defineComponent } from 'vue';
import SearchBar from './SearchBar.vue'; // Adjust the path as necessary
//import ProfileMenu from './ProfileMenu.vue';

export default defineComponent({
  name: 'AppHeader',
  components: {
    SearchBar,
//    ProfileMenu,
  },
  setup() {
  },
});
</script>

<style scoped>
.v-app-bar {
  transition: background-color 0.3s ease, color 0.3s ease;
  z-index: 3;
}

.v-app-bar.opaque {
  background-color: white !important;
}
</style>

