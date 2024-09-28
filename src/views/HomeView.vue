<template>
<v-container fluid>

    <AppHeader /> 
      <v-row>
        <v-col class="custom-col" style="flex: .1;">
          <NavMenu class="mt-13"/> 
        </v-col>
        <v-col>
          <PageContent class="mt-13"/>
        </v-col>
      </v-row>
    <AppFooter />
</v-container>
</template>

<script>
import axios from 'axios';
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

   try {
      const response = await axios.get("http://localhost:3000/getEvents");
      const res = response.data;
      this.$store.Events = res; // Update the component data with the fetched data
      console.log(JSON.stringify(this.$store.Events));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

};



</script>


<style>
.custom-col {
  padding: 0; 
  box-sizing: border-box;
}
</style>
