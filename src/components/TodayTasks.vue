<template>
<br><br><br>

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
                  showTask: task.type === 'Routine', }">
                <v-list-item-content class="textForTask">
                  <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle class="textForTask description-text">{{ task.description }}</v-list-item-subtitle>
                  <template v-if="task.todayTime !== 'morning' && task.todayTime !== 'night'">
                    <v-list-item-subtitle class="textForTask"> Date: {{ formatDate(task.date) }} </v-list-item-subtitle>
                    <v-list-item-subtitle v-if="task.allday" class="textForTask">All Day</v-list-item-subtitle>
                    <v-list-item-subtitle v-if="task.type==='Dates & Events' && !task.allday" class="textForTask"> Start Time: {{ task.startTime }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle v-if="task.type==='Dates & Events' && !task.allday" class="textForTask"> End Time: {{ task.endTime }}
                    </v-list-item-subtitle>
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

      <!-- THIS WEEK -->
      <v-col cols="12" md="6" v-if="thisweekView.length">
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
                  showTask3: task.importance === '3', }">
                <v-list-item-content class="textForTask">
                  <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle class="textForTask description-text">{{ task.type }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="textForTask description-text">{{ task.description }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="textForTask"> Date: {{ formatDate(task.date) }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-if="task.allday" class="textForTask">All Day</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="task.type==='Dates & Events' && !task.allday" class="textForTask"> Start Time: {{ task.startTime }} </v-list-item-subtitle>
                  <v-list-item-subtitle v-if="task.type==='Dates & Events' && !task.allday" class="textForTask"> End Time: {{ task.endTime }} </v-list-item-subtitle>
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

      <!-- THIS MONTH -->
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
                  showTask3: task.importance === '3', }">
                <v-list-item-content class="textForTask">
                  <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle class="textForTask description-text">{{ task.type }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="textForTask description-text">{{ task.description }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="textForTask"> Date: {{ formatDate(task.date) }} </v-list-item-subtitle>
                  <v-list-item-subtitle v-if="task.allday" class="textForTask">All Day</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="task.type==='Dates & Events' && !task.allday" class="textForTask"> Start Time: {{ task.startTime }} </v-list-item-subtitle>
                  <v-list-item-subtitle v-if="task.type==='Dates & Events' && !task.allday" class="textForTask"> End Time: {{ task.endTime }} </v-list-item-subtitle>
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

    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="title">Edit Task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="editedTask.title" label="Title"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedTask.description" label="Description"></v-text-field>
              </v-col>
              <v-col cols="12" v-if="originalList === 'tasksToDo'">
                <v-text-field v-model="editedTask.dueDate" label="Due Date"></v-text-field>
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
export default {
  data() {
    return {
      todayView: [],
      thisweekView: [],
      thismonthView: [],
      editDialog: false, // To toggle the edit dialog visibility
      editedTask: null, // To hold the task being edited
      originalTask: null, // Reference to the original task object
      originalList: null, // To keep track of which list the task belongs to
    };
  },

  computed: {
    events() {
      return this.$store.state.Events;
    }
  },

  watch: {
    // Watch for changes in the Events data
    events: {
      handler() {
        this.filtertodayView();
        this.filterthisweekView();
        this.filterthismonthView();
      },
      immediate: true, // Trigger the handler immediately on component mount
    }
  },

  methods: {
    formatDate(date) {
      const parsedDate = new Date(date);
      return parsedDate.toDateString();  
    },

    filtertodayView() {
      this.todayView = []; 
      let today = new Date();
      
      const isSameDay = (date1, date2) => {
        return date1.getUTCFullYear() === date2.getUTCFullYear() &&
               date1.getUTCMonth() === date2.getUTCMonth() &&
               date1.getUTCDate() === date2.getUTCDate();
      };

      // Filter "Tasks" for today by date
      this.events?.filter(e => e.type === "Tasks" && isSameDay(new Date(e.date), today))
        .forEach(e => this.todayView.push(e));

      // Filter tasks with "morning" time
      this.events?.filter(e => e.todayTime === "morning" && !this.todayView.includes(e))
        .forEach(e => this.todayView.push(e));

      // Filter "Dates & Events" for today or all-day events
      this.events?.filter(e => e.type === "Dates & Events" && isSameDay(new Date(e.date), today) && !this.todayView.includes(e))
        .forEach(e => this.todayView.push(e));

      // Filter tasks with "night" time
      this.events?.filter(e => e.todayTime === "night" && !this.todayView.includes(e))
        .forEach(e => this.todayView.push(e));
    },

    filterthisweekView() {
      this.thisweekView = [];
      let today = new Date();
      let dayOfWeek = today.getDay();
      let monday = new Date(today);
      monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
      let sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      let startOfWeek = monday.toISOString().split('T')[0];
      let endOfWeek = sunday.toISOString().split('T')[0];

      this.events?.forEach((item) => {
        if (item.type === "Tasks" || item.type === "Dates & Events") {
          if (item.date >= startOfWeek && item.date <= endOfWeek) {
            this.thisweekView.push(item);
          }
        }
      });
      this.thisweekView.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
  });
    },

    filterthismonthView() {
      this.thismonthView = [];
      let today = new Date();
      let currentMonth = today.getMonth() + 1;
      let currentYear = today.getFullYear();
      this.events?.forEach((item) => {
        if (item.date) {
          let eventDate = new Date(item.date);
          let eventMonth = eventDate.getMonth() + 1;
          let eventYear = eventDate.getFullYear();
          if (eventMonth === currentMonth && eventYear === currentYear) {
            this.thismonthView.push(item);
          }
        }
      });
      this.thismonthView.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
  });
    },

    editTask(task, listName) {
      this.editedTask = { ...task };
      this.originalTask = task;
      this.originalList = listName;
      this.editDialog = true;
    },

    saveEdit() {
      Object.assign(this.originalTask, this.editedTask);
      this.closeEdit();
    },

    doneTask(task, listName) {
      this.editedTask = { ...task };
      this.originalTask = task;
      this.originalList = listName;
      this.editDialog = true;
    },

    closeEdit() {
      this.editDialog = false;
      this.editedTask = null;
      this.originalTask = null;
      this.originalList = null;
    }
  }
};
</script>
