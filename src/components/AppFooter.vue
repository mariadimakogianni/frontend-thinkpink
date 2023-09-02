<template>
  <v-footer class="pa-3">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col
          v-for="link in links"
          :key="link"
          class="caption text-center"
          cols="auto"
        >
          <a href="#" class="styled-link">
            {{ link }}
          </a>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="caption text-center text--secondary">
          © 2019 - {{ new Date().getFullYear() }} — YourCompanyName
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppFooter',
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

<style scoped>
  .v-footer {
    background-color: white;
    width: 100%;
    max-width: 1200px;
    margin: auto;
    border-top: 1px solid #e0e0e0;
  }

  .styled-link {
    text-decoration: none;
    color: inherit;
    padding: 0 8px;
    position: relative;
  }

  .styled-link:hover {
    text-decoration: none;
  }

  .styled-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--v-secondary-base);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .styled-link:hover::after {
    opacity: 1;
  }
</style>

