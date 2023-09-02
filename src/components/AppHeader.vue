<template>
  <div>
    <v-app-bar
      dark
      flat
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-5">YourAppName</v-toolbar-title>

      <v-text-field
        rounded
        flat
        solo-inverted
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const drawer = ref(false);

    return {
      drawer,
    };
  },
});
</script>

