<template>
  <div>
    <AppHeader />
    <HomeSection />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import HomeSection from '@/components/HomeSection.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'HomeView',
  components: {
    AppHeader,
    HomeSection,
    AppFooter,
  },
};
</script>

