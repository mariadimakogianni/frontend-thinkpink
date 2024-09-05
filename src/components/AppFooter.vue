<template>
  <v-footer class="pa-3">
 
    <v-container fluid>
            <v-row align="center" justify="center">

        <v-col
          v-for="link in links"
          :key="link.name"
          class="caption text-center"
          cols="auto"
        >
          <a :href="`${link.location}`" :target="link.target" class="styled-link">
            {{ link.name }}
          </a>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="caption text-center text--secondary">
          © 2023 - {{ new Date().getFullYear() }} — THINKPINK
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
      { name: 'Home', location: '#home'},
      { name: 'About Us', location: '#about'},
//      { name: 'Team', location: 'teamSection' },
//      { name: 'Services', location: 'servicesSection' },
      { name: 'Documentation', location: 'https://support.sexycoders.org' , target: '_blanc'},
      { name: 'GitHub', location: 'https://github.com/SexyCoders' , target: '_blanc'},
      { name: 'Contact Us', location: '#contact'},
      { name: 'Community', location: 'https://mm.sexycoders.org' , target: '_blanc'},
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

