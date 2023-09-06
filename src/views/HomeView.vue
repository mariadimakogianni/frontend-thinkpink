<template>
  <div>
    <AppHeader />
    <NavMenu />
    <!--<HomeSection />-->
    <!--<HomeAbout />-->
    <!--<ContactSection />-->
    <HelloWorld v-if='this.$store.state.activeMenu=="profile"'/> <!-- Include HelloWorld.vue here -->
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
//import HomeSection from '@/components/HomeSection.vue';
import AppFooter from '@/components/AppFooter.vue';
//import HomeAbout from '@/components/HomeAbout.vue';
import NavMenu from '@/components/NavMenu.vue';
//import ContactSection from '@/components/ContactSection.vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {
    AppHeader,
 //   HomeSection,
 //   ContactSection,
    AppFooter,
 //   HomeAbout,
    NavMenu,
    HelloWorld,
  },
};
</script>

