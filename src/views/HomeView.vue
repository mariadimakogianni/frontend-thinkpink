<template>
  <div>
    <AppHeader />
    <HomeSection />
    <HomeAbout />
    <!--<ContactSection />-->
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import HomeSection from '@/components/HomeSection.vue';
import AppFooter from '@/components/AppFooter.vue';
import HomeAbout from '@/components/HomeAbout.vue';
//import ContactSection from '@/components/ContactSection.vue';

export default {
  name: 'HomeView',
  components: {
    AppHeader,
    HomeSection,
 //   ContactSection,
    AppFooter,
    HomeAbout,
  },
};
</script>

