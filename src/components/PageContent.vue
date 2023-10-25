<template>
  <!--<MainCalendar v-if='this.$store.state.activeMenu=="calendar"'/> -->
  <!--<MainCalendar style="color-scheme: light"/> -->
  <TodayTasks  v-if='this.$store.state.activeMenu=="today"'/>
</template>

<script>

//import MainCalendar from "./MainCalendar"
import TodayTasks from "./TodayTasks"

export default {
  name: 'PageContent',
  components: {
 // MainCalendar,    
  TodayTasks, 
  },

  data: () => ({
}),
}
</script>