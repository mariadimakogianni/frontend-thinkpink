<template>
<br>
<br>
<br>
<br>

<h2 class="title"> Morning & Night Routine</h2>

<v-container>
    <v-row>
      <!-- Morning Routine -->
      <v-col cols="12" md="6" v-if="morningRoutine.length">
        <v-card class="column morning-routine">
          <v-card-title>
            <h3>Morning Routine</h3>
          </v-card-title>
          <v-card-text>
            <v-list class="innerSquare">
              <v-list-item v-for="task in morningRoutine" :key="task.title" class="showTask">
                <v-list-item-content class="textForTask">
                  <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle class="textForTask description-text">{{ task.description }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon class="editIcon" @click="editTask(task, 'morningRoutine')">mdi-pencil</v-icon>
                    <v-icon class="delIcon" @click="delTask(task, 'morningRoutine')">mdi-delete</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

<!-- Night Routine -->
      <v-col cols="12" md="6" v-if="nightRoutine.length">
        <v-card class="column night-routine">
          <v-card-title>
            <h3>Night Routine</h3>
          </v-card-title>
          <v-card-text>
            <v-list class="innerSquare">
            <v-list-item v-for="task in nightRoutine" :key="task.title" class="showTask">
                <v-list-item-content class="textForTask">
                  <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle class="textForTask description-text"> {{ task.description }} </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon class="editIcon" @click="editTask(task, 'nightRoutine')">mdi-pencil</v-icon>
                  <v-icon class="delIcon" @click="delTask(task, 'nightRoutine')">mdi-delete</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="editDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title">Edit Task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="editedTask.title" label="Title" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedTask.description" label="Description" ></v-text-field>
              </v-col>
              <v-col cols="12" v-if="originalList === 'morningRoutine'">
                <v-text-field v-model="editedTask.dueDate" label="Due Date" ></v-text-field>
              </v-col>
              <v-col cols="12" v-else>
                <v-text-field v-model="editedTask.time" label="Time"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEdit">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveEdit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>

</template>

<script>
import axios from 'axios';

export default {

    data() {
        return {
            morningRoutine: [],
            nightRoutine: [],

      editDialog: false, 
      editedTask: null, 
      originalTask: null, 
      originalList: null, 
    };
  },

  computed: {
    events() {
      return this.$store.state.Events;
    }
  },

  watch: {
    events: {
      handler() {
        this.filtermorningRoutine();
        this.filternightRoutine();
      },
      deep: true,
      immediate: true
    }
  },

   methods: {
    filtermorningRoutine() {
      if (this.events) {
        this.morningRoutine = this.events.filter(event => event.todayTime == "morning");
      }
    },

    filternightRoutine() {
      if (this.events) {
        this.nightRoutine = this.events.filter(event => event.todayTime == "night");
      }
    },

    async delTask(event) {
      try {
        const response = await axios.delete(`http://localhost:3000/deleteEvent/${event._id}`);
        if (response.status === 200) {
          console.log('Task deleted:', response.data);
        } else {
          console.error('Error deleting task:', response.data);
        }
      } catch (error) {
        console.error('Error:', error.response ? error.response.data.message : error.message);
      }
      this.$store.commit('deleteEvent', event._id);
    },
      

    editTask(task, listName) {
      this.editedTask = { ...task }; // Create a copy of the task
      this.originalTask = task; // Reference to the original task
      this.originalList = listName;
      this.editDialog = true;
    },
    saveEdit() {
      // Update the original task with the edited values
      Object.assign(this.originalTask, this.editedTask);
      this.closeEdit();
    },
    closeEdit() {
      this.editDialog = false;
      this.editedTask = null;
      this.originalTask = null;
      this.originalList = null;
    },
  },

  async mounted() {
    this.$store.dispatch('fetchEvents');
  }
};



</script>

<style scoped>
    .morning-routine {
      border-radius: 50% 30% 60% 30% / 40% 60% 40% 60%;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px; 
      margin: 20px auto; 
      background-color: #FFA500 !important;
      color: #ffffff;
      max-width: 700px;
      display: flex;
      flex-direction: column; 
      align-items: center;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }


    .night-routine {

      border-radius: 50% 30% 60% 30% / 40% 60% 40% 60%;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px; 
      margin: 20px auto; 
      background-color: #090254 !important; 
      color: #ffffff;
      max-width: 700px;
      display: flex;
      flex-direction: column; 
      align-items: center; 
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }



    /* Calendar Customization */
    @import '../../node_modules/qalendar/dist/style.css';

    .custom-light-theme {
      /* Override the styles to create a light theme */
      background-color: #ffffff;
      color: #000000;
      /* Additional custom styles can be added here */
    }
</style>

