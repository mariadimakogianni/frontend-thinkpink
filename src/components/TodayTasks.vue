<template>
<br>
<br>
<br>

<v-container>
    <v-row>
      <!-- TODAY -->
      <v-col cols="12" md="6" v-if="todayView.length">
        <v-card class="column">
          <v-card-title>
            <h3>Today</h3>
          </v-card-title>
          <v-card-text>
            <v-list class="innerSquare">
              <v-list-item v-for="task in todayView" :key="task.title" 
                :class="{ 
                  showTask1: task.importance === '1' && task.type !== 'Routine', 
                  showTask2: task.importance === '2' && task.type !== 'Routine', 
                  showTask3: task.importance === '3' && task.type !== 'Routine', 
                  showTask: task.type === 'Routine',  
              }">
                <v-list-item-content class="textForTask">
                  <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle class="textForTask description-text">{{ task.description }}</v-list-item-subtitle>

                  <template v-if="task.todayTime !== 'morning' && task.todayTime !== 'night'">
                    <v-list-item-subtitle class="textForTask">Date: {{ task.date }}</v-list-item-subtitle>
                    <v-list-item-subtitle v-if="task.allday" class="textForTask" >  All Day </v-list-item-subtitle> 
                    <v-list-item-subtitle v-if="task.type==='Dates & Events' && !task.allday" class="textForTask">Start Time: {{ task.startTime }}</v-list-item-subtitle>
                    <v-list-item-subtitle v-if="task.type==='Dates & Events' && !task.allday" class="textForTask">End Time: {{ task.endTime }}</v-list-item-subtitle>
                  </template>

                </v-list-item-content>
                <v-list-item-action>
                  <v-icon class="doneIcon" @click="doneTask(task, 'todayView')">mdi-check</v-icon>
                  <v-icon class="editIcon" @click="editTask(task, 'todayView')">mdi-pencil</v-icon>
                    <v-icon class="delIcon" @click="delTask(task, 'todayView')">mdi-delete</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

<!-- This Week -->
      <v-col cols="12" md="6" v-if="thisweekView.length" >
        <v-card class="column">
          <v-card-title>
            <h3>This Week</h3>
          </v-card-title>
          <v-card-text>
            <v-list class="innerSquare">
            <v-list-item v-for="task in thisweekView" :key="task.title" 
              :class="{ 
                    showTask1: task.importance === '1', 
                    showTask2: task.importance === '2', 
                    showTask3: task.importance === '3', 
                }">
                <v-list-item-content class="textForTask">
                  <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle class="textForTask description-text"> {{ task.type }} </v-list-item-subtitle>
                  <v-list-item-subtitle class="textForTask description-text"> {{ task.description }} </v-list-item-subtitle>
                  <v-list-item-subtitle class="textForTask">Date: {{ task.date }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="task.allday" class="textForTask" >  All Day </v-list-item-subtitle> 
                  <v-list-item-subtitle v-if="task.type==='Dates & Events' && !task.allday" class="textForTask">Start Time: {{ task.startTime }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="task.type==='Dates & Events' && !task.allday" class="textForTask">End Time: {{ task.endTime }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon class="doneIcon" @click="doneTask(task, 'thisweekView')">mdi-check</v-icon>
                  <v-icon class="editIcon" @click="editTask(task, 'thisweekView')">mdi-pencil</v-icon>
                  <v-icon class="delIcon" @click="delTask(task, 'thisweekView')">mdi-delete</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- This Month -->

      <v-col cols="12" md="6" v-if="thismonthView.length" style="margin-left:auto">
        <v-card class="column">
          <v-card-title>
            <h3>This Month</h3>
          </v-card-title>
          <v-card-text>
            <v-list class="innerSquare">
            <v-list-item v-for="task in thismonthView" :key="task.title" 
              :class="{ 
                    showTask1: task.importance === '1', 
                    showTask2: task.importance === '2', 
                    showTask3: task.importance === '3', 
                }">
                <v-list-item-content class="textForTask">
                  <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle class="textForTask description-text"> {{ task.type }} </v-list-item-subtitle>
                  <v-list-item-subtitle class="textForTask description-text"> {{ task.description }} </v-list-item-subtitle>
                  <v-list-item-subtitle class="textForTask">Date: {{ task.date }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="task.allday" class="textForTask" >  All Day </v-list-item-subtitle> 
                  <v-list-item-subtitle v-if="task.type==='Dates & Events' && !task.allday" class="textForTask">Start Time: {{ task.startTime }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="task.type==='Dates & Events' && !task.allday" class="textForTask">End Time: {{ task.endTime }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon class="doneIcon" @click="doneTask(task, 'thismonthView')">mdi-check</v-icon>
                  <v-icon class="editIcon" @click="editTask(task, 'thismonthView')">mdi-pencil</v-icon>
                  <v-icon class="delIcon" @click="delTask(task, 'thismonthView')">mdi-delete</v-icon>
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
              <v-col cols="12" v-if="originalList === 'tasksToDo'">
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
//import axios from 'axios';

export default {

    data() {
        return {
            todayView: [],
            thisweekView: [],
            thismonthView: [],
      Events:"",
      editDialog: false, // To toggle the edit dialog visibility
      editedTask: null, // To hold the task being edited
      originalTask: null, // Reference to the original task object
      originalList: null, // To keep track of which list the task belongs to
    };
  },

   methods: {
    filtertodayView () {
      this.todayView = []; 
      console.log(this.todayView); //den deixnei keni lista!!!!!!
      let todayDate = new Date().toISOString().split('T')[0];
      this.$store.Events.filter(e => e.type === "Tasks" && (e.date === todayDate )).forEach(e => {this.todayView.push(e);}); //de douleueiiiiii
      console.log(this.todayView);
      this.$store.Events.filter(e => e.todayTime === "morning" && !this.todayView.includes(e)).forEach(e => {this.todayView.push(e);});
      this.$store.Events.filter(e => e.type === "Dates & Events" && (e.date === todayDate || e.allday === true) && !this.todayView.includes(e)).forEach(e => {this.todayView.push(e); });
      this.$store.Events.filter(e => e.todayTime === "night" && !this.todayView.includes(e)).forEach(e => {this.todayView.push(e);});
  },
    filterthisweekView () {
      this.thisweekView = [];
      let today = new Date();
      let dayOfWeek = today.getDay();
      let monday = new Date(today);
      monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
      let sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      let startOfWeek = monday.toISOString().split('T')[0];
      let endOfWeek = sunday.toISOString().split('T')[0];
      console.log('Start of week:', startOfWeek);
      console.log('End of week:', endOfWeek);
      this.$store.Events.forEach((item) => {
      if (item.type === 'Tasks' || item.type === 'Dates & Events') {
        if (item.date) {
          if (item.date >= startOfWeek && item.date <= endOfWeek) {
            this.thisweekView.push(item);
          }
        }
      }
    });
    },
    filterthismonthView() {
        this.thismonthView = [];
        let today = new Date();
        let currentMonth = today.getMonth() + 1;
        let currentYear = today.getFullYear();
        console.log('Current Month:', currentMonth);
        console.log('Current Year:', currentYear);
        this.$store.Events.forEach((item) => {
          if (item.date) {
            let eventDate = new Date(item.date);
            let eventMonth = eventDate.getMonth() + 1;
            let eventYear = eventDate.getFullYear();
            if (eventMonth === currentMonth && eventYear === currentYear) {
              this.thismonthView.push(item);
            }
          }
        });
        console.log(this.thismonthView);
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
    doneTask(task, listName){
      this.editedTask = { ...task }; // Create a copy of the task
      this.originalTask = task; // Reference to the original task
      this.originalList = listName;
      this.editDialog = true;

    },
    closeEdit() {
      this.editDialog = false;
      this.editedTask = null;
      this.originalTask = null;
      this.originalList = null;
    },
  },


async beforeMount() {
  this.filtertodayView();
  this.filterthisweekView();
  this.filterthismonthView();
 }
};



</script>


