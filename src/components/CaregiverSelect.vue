<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title>Select User to give Care</v-card-title>
      <v-card-text>
        <v-select
          v-model="selectedUserName"
          :items="assignedUserNames"
          label="Choose a user"
          outlined
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="confirmSelection">Select</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CaregiverSelect',
  props: {
    assignedUserNames: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dialog: true,
      selectedUserName: null,
    };
  },
  methods: {
     confirmSelection() {
        if (this.selectedUserName) {
          const assignedUsers = this.$store.state.auth.assignedUser || [];
          const assignedUserNames = this.$store.state.auth.assignedUserName || [];
          const selectedIndex = assignedUserNames.indexOf(this.selectedUserName);

          const selectedUser = selectedIndex !== -1 ? assignedUsers[selectedIndex] : '';

          this.$store.commit('setSelectedUser', {
            selectedUser: selectedUser,
            selectedUserName: this.selectedUserName,
          });

          this.dialog = false;
          this.$emit('user-selected'); 
        }
    },
  },
};
</script>
