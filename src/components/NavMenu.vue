<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        permanent
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item @click="this.$store.state.activeMenu='calendar'" prepend-icon="mdi-calendar-range" title="Calendar" value="myfiles"></v-list-item>
          <v-list-item @click="this.$store.state.activeMenu='profile'" prepend-icon="mdi-account" title="Profile" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
<div class="d-flex justify-center">
        <v-btn
          class="text-none text-subtitle-1 text-center"
          color="#5865f2"
          size="small"
          variant="flat"
          v-if="this.$store.state.activeMenu=='calendar'"
        >
          Logout
        </v-btn>
      </div>

      </v-navigation-drawer>

      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>

<script>

  export default {
  // ... Other component options ...
};
  </script>
