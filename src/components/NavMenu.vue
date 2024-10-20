<template>
    <v-layout>
      <v-navigation-drawer permanent>
        <v-list>
          <v-list-item class="user-list-item">
            <v-list-item-avatar>
              <v-icon class="user-icon">mdi-account-circle</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="user-title">{{ firstName }} {{ lastName }}</v-list-item-title>
              <v-list-item-subtitle class="user-subtitle">{{ email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="this.$store.getters.getAuth.isCaregiver">
            <v-list-item-content>
              <v-list-item-subtitle class="caregiver-title">You are Caregiver to this user</v-list-item-subtitle>
              <v-list-item-title class="caregiver-subtitle">{{ assigned_user }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>

          <v-list nav>
              <v-list-item @click="navigateTo('today')" value="today">
              <font-awesome-icon :icon="['fas', 'calendar-day']" size="lg" style="color: #b362bf;" />
              &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;">Today</a>
              </v-list-item>

              <v-list-item @click="navigateTo('tasks')" value="tasks">
              <font-awesome-icon :icon="['far', 'calendar-check']" size='lg' style="color: #b362bf;" />
              &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;">Tasks</a>
              </v-list-item>

              <v-list-item @click="navigateTo('routine')" value="routine">
              <font-awesome-icon :icon="['fas', 'mountain-sun']" size='lg' style="color: #b362bf;" />
              &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;">Morning & Night Routine</a>
              </v-list-item>

              <div class="d-flex justify-center">
              <v-btn
                  class="text-none text-subtitle-1 text-left"
                  color="#b362bf"
                  size="small"
                  variant="flat"
                  @click="navigateTo('createNewTask')"> New
                  </v-btn>
              </div>

              <v-list-item v-if="!this.$store.getters.getAuth.isCaregiver"
              @click="navigateTo('lists')" value="lists">
              <font-awesome-icon :icon="['fas', 'list-check']" size="lg" style="color: #b362bf;" />
              &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;">Lists</a>
              </v-list-item>

              <v-list-item v-if="!this.$store.getters.getAuth.isCaregiver"
              @click="navigateTo('stprojects')" value="stprojects">
              <font-awesome-icon :icon="['fas', 'bars-progress']" size="lg" style="color: #b362bf;" />
              &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;">Projects</a>
              </v-list-item>

              <v-list-item v-if="!this.$store.getters.getAuth.isCaregiver"
              @click="navigateTo('pomodoro')" value="pomodoro">
              <font-awesome-icon :icon="['fas', 'school']" size="lg" style="color: #b362bf;" />
              &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;">Pomodoro</a>
              </v-list-item>

              <v-list-item v-if="!this.$store.getters.getAuth.isCaregiver"
              @click="navigateTo('spinningwheel')" value="spinningwheel">
              <font-awesome-icon :icon="['fas', 'shuffle']" size="lg" style="color: #b362bf;" />
              &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;">Spinning Wheel</a>
              </v-list-item>
              </v-list>


      </v-navigation-drawer>

      <v-main style="height: 100vh"></v-main>
    </v-layout>

</template>

<script>

  export default {

     methods: {
      navigateTo(menu) {
        this.$store.state.activeMenu = menu;

        this.$router.push({ name: menu });
      }
    },
  data() {
    return {
      firstName: this.$store.getters.getAuth.firstName,
      lastName: this.$store.getters.getAuth.lastName,
      email: this.$store.getters.getAuth.email,
      assigned_user:this.$store.getters.getAuth.selectedUserName,
    };
  },
};
  </script>



<style scoped>

.user-icon {
  color: #b362bf;
  font-size: 30px;
}

.user-list-item {
  padding: 10px;
}

.user-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.user-subtitle {
  font-size: 14px;
  color: #4C4C4C;
}

.caregiver-title {
  font-size: 12px;
  font-weight: bold;
  color: #4C4C4C;
}

.caregiver-subtitle {
  font-weight: bold;
  font-size: 16px;
  color: #b362bf;
}
</style>