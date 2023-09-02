<template>
  <div>
    <AppHeader />
    <HomeSection />
    <HomeAbout />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import HomeSection from '@/components/HomeSection.vue';
import AppFooter from '@/components/AppFooter.vue';
import HomeAbout from '@/components/HomeAbout.vue';

export default {
  name: 'HomeView',
  components: {
    AppHeader,
    HomeSection,
    AppFooter,
    HomeAbout,
  },
};
</script>

