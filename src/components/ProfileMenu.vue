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

          <v-list-item @click="openCaregiverDialog">
            <v-list-item-content>
              <v-list-item-title>Become Caregiver</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon size="small">mdi-human-greeting-proximity</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="openEditProfileDialog">
            <v-list-item-content>
              <v-list-item-title>Edit your Info</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon size="small">mdi-account-edit</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="logOut">
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon size="small">mdi-login</v-icon>
            </v-list-item-icon>
          </v-list-item>

        </v-list>
      </v-card>
    </v-menu>

      <v-dialog v-model="editProfileDialog" max-width="500">
        <v-card>
          <v-card-title class="title">Edit Profile</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitEditProfile">
              <v-text-field v-model="profile.firstName" label="First Name" required></v-text-field>
              <v-text-field v-model="profile.lastName" label="Last Name" required></v-text-field>
              <v-text-field :rules="[ v => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v) || 'Invalid email address']" 
                v-model="profile.email" label="Email" required></v-text-field>

                <v-text-field
                  v-model="profile.newPassword"
                  label="New Password"
                  type="password"/>
                <v-text-field
                  v-model="profile.confirmPassword"
                  label="Confirm Password"
                  type="password" />
              <v-btn type="submit" style="background-color: #b362bf;">Save</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="caregiverDialog" max-width="500">
        <v-card>
          <v-card-title class="title" >Caregiver Assign</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="assignCaregiver">
              <v-switch
                v-model="caregiver.isCaregiver"
                label="Are you a caregiver?" >
              </v-switch>

              <!-- Show assigned users if the user is caregiver -->
              <div v-if="caregiver.isCaregiver">
                <v-subheader>Your Assigned Users</v-subheader>
                <v-list>
                  <v-list-item
                    v-for="(user, index) in caregiver.assignedUsers"
                    :key="index">
                    <v-list-item-content>
                      <v-list-item-title>{{ user }}</v-list-item-title>
                    </v-list-item-content>
                      <v-icon @click="removeAssignedUser(index)" >mdi-delete</v-icon>
                  </v-list-item>
                </v-list>

                <!-- Form to assign a new user -->
                <v-text-field
                  v-model="caregiver.userEmail"
                  :rules="[
                    (v) => !!v || 'Email is required',
                    (v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v) || 'Invalid email address',
                  ]"
                  label="User's Email to Assign"
                  required
                ></v-text-field>
                <v-btn type="submit" style="background-color: #b362bf;">Assign User</v-btn>
              </div>
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
      newPassword: '', 
      confirmPassword: '', 
      email: ''
    },
    caregiverDialog: false,
      caregiver: {
        isCaregiver: false,
        userEmail: "", 
        assignedUsers: [] 
      },
  }),
  methods: {
    logOut(){
      var idToken = this.$store.getters.getAuth.idToken;
      var logoutUrl = 'http://localhost:8081/realms/ThinkPink/protocol/openid-connect/logout' +
                      '?id_token_hint=' + idToken +
                      '&post_logout_redirect_uri=https://localhost:8080';
      window.location.href = logoutUrl;
    },

    openCaregiverDialog() {
      const auth = this.$store.getters.getAuth;

      this.caregiver = {
        isCaregiver: auth.isCaregiver === 'true' || auth.isCaregiver === true,
        userEmail: '', 
        assignedUsers: auth.assignedUserName || [],
      };

      if (!Array.isArray(this.caregiver.assignedUsers)) {
        this.caregiver.assignedUsers = [this.caregiver.assignedUsers];
      }

      console.log("Assigned user emails in dialog:", this.caregiver.assignedUsers);
      this.caregiverDialog = true;
    },


    async assignCaregiver() {
      try {
          console.log("Sending data to API:", {
            isCaregiver: this.caregiver.isCaregiver,
            userEmail: this.caregiver.userEmail,
          }); 
        await this.$store.dispatch('refreshTokenIfNeeded');
        const headers = this.$store.getters.getAuth.headers;
        const response = await axios.post(
          "https://localhost:3000/assignCaregiver",
          {
            isCaregiver: this.caregiver.isCaregiver,
            userEmail: this.caregiver.userEmail,
          },
          { headers }
        );

        if (response.status === 200) {
          console.log("Caregiver assigned successfully");
          this.caregiverDialog = false; 
          window.location.reload()
        } else {
          console.error("Failed to assign caregiver");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.error("The user is already a caregiver.");
          alert("The selected user is already a caregiver. Please choose a different user.");
        } else {
          console.error("An error occurred:", error);
          alert("An error occurred while assigning the caregiver.");
        }
      }
    },

    async removeAssignedUser(index) {
      const userEmail = this.caregiver.assignedUsers[index];
      if (confirm(`Are you sure you want to remove ${userEmail}?`)) {
        try {
          await this.$store.dispatch('refreshTokenIfNeeded');
          const headers = this.$store.getters.getAuth.headers;

          const response = await axios.delete(
            `https://localhost:3000/removeAssignedUser`,
            {
              headers,
              data: { userEmail }
            }
          );

          if (response.status === 200) {
            alert(`${userEmail} has been removed successfully.`);
            this.caregiver.assignedUsers.splice(index, 1); 
          } else {
            alert('Failed to remove the assigned user. Please try again.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
          alert('An error occurred while removing the assigned user.');
        }
      }
    },

    openEditProfileDialog() {
      this.profile = {
          firstName: this.$store.getters.getAuth.firstName,
          lastName: this.$store.getters.getAuth.lastName,
          email: this.$store.getters.getAuth.email,
          newPassword: '',
          confirmPassword: '',
        };
      this.editProfileDialog = true;
    },

    async submitEditProfile() {
      try {
        if (this.profile.newPassword !== this.profile.confirmPassword) {
          alert('Passwords dont match.');
          return;
        }

        const updatedData = {
          firstName: this.profile.firstName,
          lastName: this.profile.lastName,
          email: this.profile.email,
          password: this.profile.newPassword, 
        };

      await this.$store.dispatch('refreshTokenIfNeeded');
      const headers = this.$store.getters.getAuth.headers;
      const response = await axios.put('https://localhost:3000/updateUserProfile', updatedData, { headers });
      console.log("edit responce", this.response);
      if (response.status === 200) {
          console.log('Profile updated successfully');
          this.editProfileDialog = false; 

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

