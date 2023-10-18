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
    <!-- <HomeSection /> -->
    <!--<HomeAbout />-->
    <!--<ContactSection />-->
  <!--  <HelloWorld v-if='this.$store.state.activeMenu=="profile"'/> -->
    <AppFooter />
</v-container>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import PageContent from '@/components/PageContent.vue';
//import HomeSection from '@/components/HomeSection.vue';
import AppFooter from '@/components/AppFooter.vue';
//import HomeAbout from '@/components/HomeAbout.vue';
import NavMenu from '@/components/NavMenu.vue';
//import ContactSection from '@/components/ContactSection.vue';
//import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {
    AppHeader,
  //  HomeSection,
  //  ContactSection,
    AppFooter,
 //   HomeAbout,
    NavMenu,
    PageContent,
  //  HelloWorld,
  },
};
</script>


<style>
.custom-col {
  padding: 0; /* Remove padding to prevent extra space */
  box-sizing: border-box;
}
</style>