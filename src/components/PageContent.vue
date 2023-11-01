<template>
  <!--<MainCalendar v-if='this.$store.state.activeMenu=="calendar"'/> -->
  <!--<MainCalendar style="color-scheme: light"/> -->
  <TodayTasks  v-if='this.$store.state.activeMenu=="today"'/>
  <CreateTasks  v-if='this.$store.state.activeMenu=="createNewEvent"'/>
</template>

<script>

//import MainCalendar from "./MainCalendar"
import TodayTasks from "./TodayTasks"
import CreateTasks from "./CreateTasks"


export default {
  name: 'PageContent',
  components: {
 // MainCalendar,    
  TodayTasks, 
  CreateTasks,
  },

  data: () => ({
}),
}
</script>