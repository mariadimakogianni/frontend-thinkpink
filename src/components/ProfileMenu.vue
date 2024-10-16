<template>
  <div>
    <v-menu
      transition="scale-transition"
      :close-on-content-click="true"
      location="end"
      v-model="menu"
      class="profile-menu"
    >
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props" class="profile-button">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-card class="elegant-card text-center" min-width="150">
        <v-list density="compact">

          <v-list-item @click="openEditProfileDialog">
            <v-list-item-content>
              <v-list-item-title>Edit your Info</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon size="x-small">mdi-account-edit</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="logOut">
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon size="x-small">mdi-login</v-icon>
            </v-list-item-icon>
          </v-list-item>

        </v-list>
      </v-card>
    </v-menu>

      <v-dialog v-model="editProfileDialog" max-width="500">
        <v-card>
          <v-card-title>Edit Profile</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitEditProfile">
              <v-text-field v-model="profile.firstName" label="First Name" required></v-text-field>
              <v-text-field v-model="profile.lastName" label="Last Name" required></v-text-field>
              <v-text-field v-model="profile.email" label="Email" required></v-text-field>
              <v-btn type="submit" color="primary">Save</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ProfileMenu',
  data: () => ({
    menu: false,
    editProfileDialog: false,
    profile: {       
      firstName: '',
      lastName: '',
      email: ''
    },
  }),
  methods: {
    logOut(){
      var idToken = this.$store.getters.getAuth.idToken;
      var logoutUrl = 'http://localhost:8081/realms/ThinkPink/protocol/openid-connect/logout' +
                      '?id_token_hint=' + idToken +
                      '&post_logout_redirect_uri=http://localhost:8080';

      window.location.href = logoutUrl;

    },

    openEditProfileDialog() {
      //this.menu = false;
      this.profile = {
          firstName: this.$store.getters.getAuth.firstName,
          lastName: this.$store.getters.getAuth.lastName,
          email: this.$store.getters.getAuth.email,
        };
      this.editProfileDialog = true;
    },

    async submitEditProfile() {
      try {
        const updatedData = {
          firstName: this.profile.firstName,
          lastName: this.profile.lastName,
          email: this.profile.email,
        };
      const headers = this.$store.getters.getAuth.headers;
      const response = await axios.put('http://localhost:3000/updateUserProfile', updatedData, { headers });
      console.log("edit responce", this.response);
      if (response.status === 200) {
          console.log('Profile updated successfully');
          this.editProfileDialog = false;  // Close the dialog
          window.location.reload()
        } else {
          console.error('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },


    },

  };

</script>

<style scoped>

.sleek-item {
  transition: background-color 0.3s ease;
}

.sleek-item:hover {
  background-color: #f0f0f0; 
}

.sleek-icon {
  color: grey; 
}

</style>

