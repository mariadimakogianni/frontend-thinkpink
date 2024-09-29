<template>
<br>
<br>
<br>
<br>

<h2 class="title"> View All Tasks & Events</h2>

<v-container>
  <v-row>
    <!-- Tasks List -->
    <v-col cols="12" md="6" v-if="tasksToDo.length">
      <v-card class="column">
        <v-card-title>
          <h3>Tasks</h3>
        </v-card-title>
        <v-card-text>
          <v-list class="innerSquare">
            <v-list-item v-for="task in tasksToDo" :key="task.title" class="showTask">
              <v-list-item-content class="textForTask">
                <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                <v-list-item-subtitle class="textForTask description-text">{{ task.description }}</v-list-item-subtitle>
                <v-list-item-subtitle class="textForTask">Due: {{ new Date(task.date).toDateString() }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon class="doneIcon" @click="doneTask(task)">mdi-check</v-icon>
                <v-icon class="editIcon" @click="editTask(task, 'tasksToDo')">mdi-pencil</v-icon>
                <v-icon class="delIcon" @click="delTask(task, 'tasksToDo')">mdi-delete</v-icon>
              </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Dates Events Task -->
      <v-col cols="12" md="6" v-if="tasksEvents.length">
        <v-card class="column">
          <v-card-title>
            <h3>Dates & Events</h3>
          </v-card-title>
          <v-card-text>
            <v-list class="innerSquare">
              <v-list-item v-for="task in tasksEvents" :key="task.title" class="showTask">
                <v-list-item-content class="textForTask">
                  <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle class="textForTask description-text">{{ task.description }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="task.allday" class="textForTask">All Day</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="!task.allday" class="textForTask">Start Time: {{ task.startTime }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="!task.allday" class="textForTask">End Time: {{ task.endTime }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="textForTask">Date: {{ new Date(task.date).toDateString() }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon class="doneIcon" @click="doneTask(task, 'tasksEvents')">mdi-check</v-icon>
                  <v-icon class="editIcon" @click="editTask(task, 'tasksEvents')">mdi-pencil</v-icon>
                  <v-icon class="delIcon" @click="delTask(task, 'tasksEvents')">mdi-delete</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Done Task -->
    <v-col cols="12" md="6" v-if="tasksToDo.length" style="margin-left:auto">
      <v-card class="column">
        <v-card-title>
          <h3>Done</h3>
        </v-card-title>
        <v-card-text>
          <v-list class="innerSquare">
            <v-list-item v-for="task in tasksToDo" :key="task.title" class="showTask">
              <v-list-item-content class="textForTask">
                <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                <v-list-item-subtitle class="textForTask description-text">{{ task.description }}</v-list-item-subtitle>
                <v-list-item-subtitle class="textForTask">Time: {{ task.startTime }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon class="delIcon" @click="delTask(task, 'tasksToDo')">mdi-delete</v-icon>
              </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

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
  import axios from 'axios'
export default {
  data() {
    return {
      tasksToDo: [],
      tasksEvents: [],
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
        this.filterToDo();
        this.filterEvents();
      },
      immediate: true
    }
  },

  methods: {
    filterToDo() {
      if (this.events) {
        this.tasksToDo = this.events.filter(event => event.type === "Tasks" && !event.done);
      }
    },
    filterEvents() {
      if (this.events) {
        this.tasksEvents = this.events.filter(event => event.type === "Dates & Events");
      }
    },
    editTask(task, listName) {
      this.editedTask = { ...task }; // Create a copy of the task
      this.originalTask = task; // Reference to the original task
      this.originalList = listName;
      this.editDialog = true;
    },
    doneTask(task) {
      console.log("task",task)
      const eventId = task._id;  // Assuming your task object contains the event_id

      // Send a PUT request to the API to mark the event as done
      axios.put(`http://localhost:3000/doneEvent/${eventId}`)
        .then(response => {
          // Handle the success - mark the task as done in the UI if needed
          console.log('Event marked as done:', response.data);

        })
        .catch(error => {
          console.error('Failed to update event as done:', error);
          // Optionally, handle the error in the UI
        });
        this.$store.commit('setEventDone', eventId);
      },
    saveEdit() {
      Object.assign(this.originalTask, this.editedTask);
      this.closeEdit();
    },
    closeEdit() {
      this.editDialog = false;
      this.editedTask = null;
      this.originalTask = null;
      this.originalList = null;
    },
    async delTask(event) {
      try {
        const response = await axios.delete(`http://localhost:3000/deleteEvent/${event._id}`);
        if (response.status === 200) {
          console.log('Task deleted:', response.data.message);
        } else {
          console.error('Error deleting task:', response.data.message);
        }
      } catch (error) {
        console.error('Error:', error.response ? error.response.data.message : error.message);
      }
      this.$store.commit('deleteEvent', event._id);
    }
        
  },

  async mounted() {
    this.$store.dispatch('fetchEvents');
  }
};
</script>
