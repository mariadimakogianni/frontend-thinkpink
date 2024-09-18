<template>
  <TodayTasks  v-if='this.$store.state.activeMenu=="today"'/>
  <ViewTasks  v-if='this.$store.state.activeMenu=="tasks"'/>
  <CreateTasks  v-if='this.$store.state.activeMenu=="createNewEvent"'/>
  <MoRoutine v-if='this.$store.state.activeMenu=="routine"'/>
  <ListCheckbox v-if='this.$store.state.activeMenu=="lists"'/>
</template>

<script>
import TodayTasks from "./TodayTasks"
import ViewTasks from "./ViewTasks"
import CreateTasks from "./CreateTasks"
import MoRoutine from "./MoRoutine"
import ListCheckbox from "./ListCheckbox"

export default {
  name: 'PageContent',
  components: { 
  TodayTasks,
  ViewTasks, 
  MoRoutine,
  CreateTasks,
  ListCheckbox,
  },

  data: () => ({
}),
}
</script>