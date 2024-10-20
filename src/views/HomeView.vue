<template>
  <v-container fluid>
    <CaregiverSelect
      v-if="isCaregiver"
      :assignedUserNames="assignedUserName"/>
    <AppHeader  /> 
    <v-row v-if="!isCaregiver || selectedUser">
      <v-col class="custom-col" style="flex: .1;">
        <NavMenu class="mt-13"/> 
      </v-col>
      <v-col>
        <PageContent v-if="$store.state.Events" class="mt-13"/>
        <div v-else>Loading events...</div>
      </v-col>
    </v-row>
    <AppFooter v-if="!isCaregiver || selectedUser" />
  </v-container>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import PageContent from '@/components/PageContent.vue';
import AppFooter from '@/components/AppFooter.vue';
import NavMenu from '@/components/NavMenu.vue';
import CaregiverSelect from '@/components/CaregiverSelect.vue';

export default {
  name: 'HomeView',
  components: {
    CaregiverSelect,
    AppHeader,
    AppFooter,
    NavMenu,
    PageContent,
    
  },
   computed: {
    isCaregiver() {
      console.log("isCaregiver", this.$store.state.auth.isCaregiver)
      return this.$store.state.auth.isCaregiver === true;
    },
    assignedUserName() {
      console.log("assignedUserNames", this.$store.state.auth.assignedUserName)
      return this.$store.state.auth.assignedUserName || [];

    },
    selectedUser() {
      console.log("selectedUser", this.$store.state.auth.selectedUser);
      return this.$store.state.auth.selectedUser;
    }
  },

  watch: {
    async selectedUser(newValue) {
      if (this.isCaregiver && newValue) {
        console.log("Watcher: Fetching events for selected user", newValue);
        await this.$store.dispatch('fetchEvents');
      }
    }
  },
  
  async mounted() {
    //this.$store.dispatch('fetchEvents');
    if (!this.isCaregiver) {
    await this.$store.dispatch('fetchEvents');
  } else if (this.isCaregiver && this.selectedUser) {
    console.log("Mounted: Fetching events for caregiver's selected user", this.selectedUser);
    await this.$store.dispatch('fetchEvents');
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
