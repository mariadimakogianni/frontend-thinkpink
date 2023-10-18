<template>
  <!--<MainCalendar v-if='this.$store.state.activeMenu=="calendar"'/> -->
  <MainCalendar style="color-scheme: light"/>
</template>

<script>

import MainCalendar from "./MainCalendar"

export default {
  name: 'PageContent',
  components: {
  MainCalendar,    
  },

  data: () => ({
}),
}
</script>