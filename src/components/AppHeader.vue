<template>
  <v-app-bar
  :elevation="2"
  color="#b362bf">

    <v-toolbar-title class="mr-5" 
      :style="titleStyle">ThinkPink</v-toolbar-title> 

   <v-spacer></v-spacer>
  <v-btn icon :color="getIconColor">
     <ProfileMenu />
   </v-btn>
  </v-app-bar>
</template>

<script>
import { defineComponent } from 'vue';
import ProfileMenu from './ProfileMenu.vue';

export default defineComponent({
  name: 'AppHeader',
  components: {
    ProfileMenu,
  },
  setup() {
  },
});
</script>

<style scoped>

</style>

