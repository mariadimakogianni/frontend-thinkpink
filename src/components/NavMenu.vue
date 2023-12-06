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
          <!--<v-list-item
    v-for="(menuItem, index) in MenuItems"
    :key="index"
    @click="this.$store.state.activeMenu = menuItem.text"
    :value="menuItem.text"
  >
   <font-awesome-icon :icon="['fas', 'calendar-day']" size="lg" style="color: #b362bf;" />
    &nbsp;&nbsp;&nbsp;&nbsp;
    <a style="color: #b362bf;">{{ menuItem.text }}</a>
  </v-list-item> -->

           <v-list-item @click="this.$store.state.activeMenu='today'" value="today" >     <font-awesome-icon :icon="['fas', 'calendar-day']" size="lg" style="color: #b362bf;" /> &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Today</a>
          </v-list-item>
          
     
          <v-list-item @click="this.$store.state.activeMenu='calendar'" value="calendar" >     <font-awesome-icon :icon="['far', 'calendar-check']" size='lg' style="color: #b362bf;" /> &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Calendar</a>
          </v-list-item>

          <v-list-item @click="this.$store.state.activeMenu='bills'" value="bills" >     <font-awesome-icon :icon="['fas', 'sack-dollar']" size="lg" style="color: #b362bf;" /> &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Bills</a>
          </v-list-item>

          <v-list-item @click="this.$store.state.activeMenu='eventsandbirthdays'" value="eventsandbirthdays" >     <font-awesome-icon :icon="['fas', 'cake-candles']" size="lg" style="color: #b362bf;" /> &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Events & Birthdays</a>
          </v-list-item>

           <v-list-item @click="this.$store.state.activeMenu='supermarket'" value="supermarket" >     <font-awesome-icon :icon="['fas', 'cart-shopping']" size="lg" style="color: #b362bf;" /> &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Supermarket</a>
          </v-list-item>

          <v-list-item @click="this.$store.state.activeMenu='studynwork'" value="studynwork" >     <font-awesome-icon :icon="['fas', 'cart-shopping']" size="lg" style="color: #b362bf;" /> &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Study & Work</a>
          </v-list-item>

           <v-list-item @click="this.$store.state.activeMenu='pomodoro'" value="pomodoro" >    <font-awesome-icon :icon="['fas', 'stopwatch']" size="lg" style="color: #b362bf;" />&nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Pomodoro</a>
          </v-list-item>

          <v-list-item @click="this.$store.state.activeMenu='spinningwheel'" value="spinningwheel" >   <font-awesome-icon :icon="['fas', 'shuffle']" size="lg" style="color: #b362bf;" /> &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #b362bf;" >Spinning Wheel</a>
          </v-list-item>


          
        </v-list>
        <div class="d-flex justify-center">
        <v-btn
          class="text-none text-subtitle-1 text-center"
          color="#b362bf"
          size="small"
          variant="flat"
          @click="this.$store.state.activeMenu='createNewEvent'"
        >
          New
        </v-btn>
      </div>

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
