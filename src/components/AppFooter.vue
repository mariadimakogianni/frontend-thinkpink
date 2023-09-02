<template>
  <v-footer class="bg-indigo-lighten-1">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        © 2019 - {{ new Date().getFullYear() }} — SEXYCODERS LIMITED
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HomeView',

  components: {
  },
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }),
});
</script>
