<template>
  <v-app-bar
    :class="{'opaque': scrolled}"
    :color="scrolled ? 'white' : 'transparent'"
    :elevation="scrolled ? 4 : 0"
    app
    fixed
  >
    <v-app-bar-nav-icon @click="drawer = !drawer" :color="scrolled ? 'black' : 'white'"></v-app-bar-nav-icon>
    <v-toolbar-title class="mr-5" :style="{ color: scrolled ? 'black' : 'white' }">YourAppName</v-toolbar-title>
    <SearchBar v-if="showSearchBar" />
    <v-spacer></v-spacer>
    <v-btn icon :color="scrolled ? 'black' : 'white'">
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn icon :color="scrolled ? 'black' : 'white'">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { defineComponent, ref } from 'vue';
import SearchBar from './SearchBar.vue'; // Adjust the path as necessary

export default defineComponent({
  name: 'AppHeader',
  components: {
    SearchBar
  },
  setup() {
    const drawer = ref(false);
    const scrolled = ref(false);
    const showSearchBar = 0;

    window.addEventListener('scroll', () => {
      scrolled.value = window.scrollY > 0;
    });

    return {
      drawer,
      scrolled,
      showSearchBar
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

