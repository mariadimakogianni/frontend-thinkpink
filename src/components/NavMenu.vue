<template>
  <!--- <v-card> -->
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

        <v-list nav>

          <v-list-item @click="this.$store.state.activeMenu='today'" value="today" >     <font-awesome-icon :icon="['fas', 'calendar-day']" size="lg" style="color: #b362bf;" /> &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Today</a>
          </v-list-item>
          
     
          <v-list-item @click="this.$store.state.activeMenu='tasks'" value="tasks" >     <font-awesome-icon :icon="['far', 'calendar-check']" size='lg' style="color: #b362bf;" /> &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Tasks</a>
          </v-list-item>

          <v-list-item @click="this.$store.state.activeMenu='routine'" value="routine" >     <font-awesome-icon :icon="['fas', 'mountain-sun']" size='lg' style="color: #b362bf;" /> &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Morning & Night Routine</a>
          </v-list-item>

          <div class="d-flex justify-center">
            <v-btn
              class="text-none text-subtitle-1 text-left"
              color="#b362bf"
              size="small"
              variant="flat"
              @click="this.$store.state.activeMenu='createNewEvent'" >
              New
            </v-btn>
          </div>

          <v-list-item @click="this.$store.state.activeMenu='lists'" value="lists" >     <font-awesome-icon :icon="['fas', 'list-check']" size="lg" style="color: #b362bf;" /> &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Lists</a>
          </v-list-item>

          <v-list-item @click="this.$store.state.activeMenu='stprojects'" value="stprojects" >   <font-awesome-icon :icon="['fas', 'bars-progress']" size="lg" style="color: #b362bf;" /> &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Projects </a>
          </v-list-item>

          <v-list-item @click="this.$store.state.activeMenu='pomodoro'" value="pomodoro" >   <font-awesome-icon :icon="['fas', 'school']" size="lg" style="color: #b362bf;" /> &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Pomodoro </a>
          </v-list-item>

          <v-list-item @click="this.$store.state.activeMenu='spinningwheel'" value="spinningwheel" >   <font-awesome-icon :icon="['fas', 'shuffle']" size="lg" style="color: #b362bf;" /> &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Spinning Wheel</a>
          </v-list-item>


        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh"></v-main>
    </v-layout>
<!--  </v-card> -->
</template>

<script>

  export default {
  // ... Other component options ...

      data: () => ({
        //MenuItems: [ {icon:"['fas', 'calendar-day']", text:"Calendar"},
        //],
    }),

    /*
    var t=[

    {icon:'blabla',text:'blabla'},
    {icon:'blabla',text:'blabla'},
    {icon:'blabla',text:'blabla'},
    {icon:'blabla',text:'blabla'},
    {icon:'blabla',text:'blabla'},

    ]
    */
};
  </script>
