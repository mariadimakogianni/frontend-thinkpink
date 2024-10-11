<template>
  <v-container fluid>
    <AppHeader /> 
    <v-row>
      <v-col class="custom-col" style="flex: .1;">
        <NavMenu class="mt-13"/> 
      </v-col>
      <v-col>
        <PageContent v-if="$store.state.Events" class="mt-13"/>
        <div v-else>Loading events...</div>
      </v-col>
    </v-row>
    <AppFooter />
  </v-container>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import PageContent from '@/components/PageContent.vue';
import AppFooter from '@/components/AppFooter.vue';
import NavMenu from '@/components/NavMenu.vue';

export default {
  name: 'HomeView',
  components: {
    AppHeader,
    AppFooter,
    NavMenu,
    PageContent,
  },
  
  async mounted() {
    this.$store.dispatch('fetchEvents');
  }
};
</script>

<style>
.custom-col {
  padding: 0; 
  box-sizing: border-box;
}
</style>
