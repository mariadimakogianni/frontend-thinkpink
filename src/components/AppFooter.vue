<template>
  <v-footer class="pa-3">
 
    <v-container fluid>
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

</style>

