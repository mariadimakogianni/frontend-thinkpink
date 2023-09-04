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
import { defineComponent, ref, computed } from 'vue';
import SearchBar from './SearchBar.vue'; // Adjust the path as necessary
//import ProfileMenu from './ProfileMenu.vue';

export default defineComponent({
  name: 'AppHeader',
  components: {
    SearchBar,
//    ProfileMenu,
  },
  setup() {
    const drawer = ref(false);
    const scrolled = ref(false);
    const darkTheme = ref(false); // Replace this with your actual dark theme state
    const userIsLoggedIn = 0; // Replace this with your actual logic for user authentication
    const showSearchBar = 0;

    window.addEventListener('scroll', () => {
      scrolled.value = window.scrollY > 0;
    });

    const getAppBarColor = computed(() => {
      return scrolled.value ? 'white' : darkTheme.value ? 'black' : 'transparent';
    });

    const getIconColor = computed(() => {
      return scrolled.value || darkTheme.value ? 'black' : 'white';
    });

    const getTextColor = computed(() => {
      return scrolled.value || darkTheme.value ? 'black' : 'white';
    });

    const titleStyle = computed(() => {
      if (userIsLoggedIn.value) {
        return { color: getTextColor.value, margin: '0', padding: '0' };
      } else {
        return { color: getTextColor.value };
      }
    });

    return {
      drawer,
      scrolled,
      showSearchBar,
      getAppBarColor,
      getIconColor,
      getTextColor,
      userIsLoggedIn,
      titleStyle
    };
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

