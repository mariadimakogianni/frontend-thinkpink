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
            <v-list-item v-for="task in tasksToDo" :key="task._id" class="showTask">
              <v-list-item-content class="textForTask">
                <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                <v-list-item-subtitle class="textForTask description-text">{{ task.description }}</v-list-item-subtitle>
                <v-list-item-subtitle class="textForTask">Due: {{ formatDate(task.date) }}</v-list-item-subtitle>
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
              <v-list-item v-for="task in tasksEvents" :key="task._id" class="showTask">
                <v-list-item-content class="textForTask">
                  <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle class="textForTask description-text">{{ task.description }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="task.allday" class="textForTask">All Day</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="!task.allday" class="textForTask">Start Time: {{ task.startTime }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="!task.allday" class="textForTask">End Time: {{ task.endTime }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="textForTask">Date: {{ formatDate(task.date) }}</v-list-item-subtitle>
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
    <v-col cols="12" md="6" v-if="tasksDone.length" style="margin-left:auto">
      <v-card class="column">
        <v-card-title>
          <h3>Done</h3>
        </v-card-title>
          <v-card-text>
            <v-list class="innerSquare">
              <v-list-item v-for="task in tasksDone" :key="task.title" 
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
                  <v-icon class="delIcon" @click="delTask(task, 'tasksDone')">mdi-delete</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>

        </v-card>
      </v-col>

      <!-- Edit Dialog -->
      <v-dialog v-model="editDialog" persistent max-width="800px">
        <v-card>
          <v-card-title>
            <span class="title">Edit Task</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="editForm" v-model="editFormValid">
                <v-row>
                        <!-- Type -->
                   <v-col cols="12">
                          <v-text class="title" >Type: </v-text>
                          <v-text > {{ editedTask.type }} </v-text>
                    </v-col>
                        <!-- Title -->
                  <v-col cols="12">
                      <v-text-field
                      v-model="editedTask.title"
                      label="Title"
                      :rules="[v => !!v || 'Item is required']"
                      required
                      class="form-field"
                    ></v-text-field>
                  </v-col>

                   <!-- Date / due date -->
                  <v-col cols="12">
                    <v-text-field
                      v-model="date" 
                      label="Date & Due Date"
                      v-if="editedTask.type=='Tasks' ||  editedTask.type=='Dates & Events'"
                      @click="showDatePicker=true"
                      :rules="[v => !!v || 'Item is required']"
                      required
                      class="form-field"
                    ></v-text-field>
                    <v-date-picker
                      v-if="showDatePicker"
                      v-model="date"
                      @click:save="onDatePickerChange"
                      class="date-picker"
                      ></v-date-picker>
                  </v-col>

                   <!-- description -->
                  <v-col cols="12">
                      <v-text-field
                      v-model="editedTask.description"
                      label="Description"
                      class="form-field"
                    ></v-text-field>
                  </v-col>

                  <!-- routines -->
                  <v-col cols="12">
                      <v-select
                      v-if="editedTask.type=='Routine'"
                      v-model="editedTask.todayTime"
                      :items="['morning','night']"
                      label="Time of the day"
                      required
                      class="form-field"
                      ></v-select>
                  </v-col>

                   <!-- frequency -->
                  <v-col cols="12">
                      <v-select
                      v-model="editedTask.frequency"
                      :items="['Every Day','One Time','Every Week','Every Month','Every Year','Custom']"
                      label="Frequency"
                      required
                      v-if="editedTask.type=='Tasks' || editedTask.type=='Dates & Events'"
                      class="form-field"
                    ></v-select>
                  </v-col>

                  <!-- allday -->
                  <v-col cols="12">
                    <v-checkbox
                      v-model="editedTask.allday"
                      v-if="editedTask.type=='Dates & Events'"
                      label="All Day"
                      class="form-field"
                    ></v-checkbox>
                  </v-col>

                  <!-- startTime -->
                  <v-col cols="12">
                    <v-text-field
                      v-if="!editedTask.allday && editedTask.type == 'Dates & Events'"
                      v-model="editedTask.startTime"
                      type="time"
                      suffix="EET"
                      label="Start Time"
                      class="form-field"
                    ></v-text-field>
                  </v-col>

                  <!-- endTime -->
                  <v-col cols="12">
                    <v-text-field
                      v-if="!editedTask.allday && editedTask.type == 'Dates & Events'"
                      v-model="editedTask.endTime"
                      type="time"
                      suffix="EET"
                      label="End Time"
                      class="form-field"
                    ></v-text-field>
                  </v-col>

                   <!-- costum frequency -->
                  <v-col cols="12">
                    <v-text-field
                    v-if="editedTask.frequency=='Custom'"
                    v-model="editedTask.frequency2"
                    label="Every X Number of Days"
                    required
                    class="form-field"
                  ></v-text-field>
                  </v-col>

                <!-- importance -->
                  <v-col cols="12">
                    <v-select
                    v-model="editedTask.importance"
                    v-if="editedTask.type=='Tasks' || editedTask.type=='Dates & Events'"
                    :items="['1','2','3']"
                    label="Importance"
                    required
                    class="form-field"
                  ></v-select>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue" text @click="closeEdit">Cancel</v-btn>
            <v-btn
              color="blue"
              text
              @click="saveEdit"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import { VDatePicker } from 'vuetify/labs/VDatePicker';
export default {
  components: {
      VDatePicker,
    },
  data() {
    return {
      tasksToDo: [],
      tasksEvents: [],
      tasksDone: [],
      showDatePicker: false,
      editDialog: false, 
      editedTask: [], 
      formattedDate:"",
      date:new Date(),
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
        this.filterDone();
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
     onDatePickerChange() {
        setTimeout(() => {
          this.formattedDate = new Date(this.date).toLocaleDateString();
          this.editedTask.date=this.date;
          console.log(this.date);
          this.$data.showDatePicker = false;
        }, 10);
      },

    formatDate(date) {
      console.log("formatDate:",date)
      var t=new Date(date);  
      return t.toDateString();
    },

    filterToDo() {
      if (this.events) {
        this.tasksToDo = this.events.filter(event => event.type === "Tasks" && !event.done);
      }
      this.tasksToDo.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
      });
    },

    filterEvents() {
      if (this.events) {
        this.tasksEvents = this.events.filter(event => event.type === "Dates & Events" && !event.done);
      }
      this.tasksEvents.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
      });
    },

    filterDone() {
      if (this.events) {
        this.tasksDone = this.events.filter(event => event.done === true && !event.noShow );
        console.log(this.tasksDone);
      }
      this.tasksDone.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
      });
    },

      async doneTask(task) {
        const eventId = task._id;

        try {
          const headers = this.$store.getters.getAuth.headers;
          const response = await axios.put(`http://localhost:3000/doneEvent/${eventId}`, { headers });
          if (response.status === 200) {
            console.log('Event marked as done:', response.data);
          } else {
            console.error('Failed to mark event as done:', response.data);
          }
        } catch (error) {
          console.error('Error:', error.response ? error.response.data.message : error.message);
        }
        
        this.$store.commit('setEventDone', eventId);
      },

    async delTask(event) {
      try {
        const headers = this.$store.getters.getAuth.headers;
        const response = await axios.delete(`http://localhost:3000/deleteEvent/${event._id}`, { headers });
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

     async saveEdit() {
      if (!this.editedTask || !this.editedTask._id) {
        console.error('No task selected for editing.');
        return;
      }

      const eventId = this.editedTask._id;
      const updatedEvent = { ...this.editedTask };
      delete updatedEvent.formValid;
      delete updatedEvent.showDatePicker;

      try {
        const headers = this.$store.getters.getAuth.headers;
        const response = await axios.patch(`http://localhost:3000/editEvent/${eventId}`, updatedEvent, { headers });

        if (response.status === 200) {
           this.$store.commit('updateEvent', response.data);
          console.log('Event updated successfully:', response.data);
          this.closeEdit();
          await this.$store.dispatch('fetchEvents');
        } else {
          console.error('Failed to update event:', response.data);
        }
      } catch (error) {
        console.error('Error updating event:', error.response ? error.response.data.message : error.message);
      }
    },

      editTask(task) {
        console.log(task.date);
        this.editedTask = JSON.parse(JSON.stringify(task));
            this.date=new Date(this.editedTask.date);
        console.log("editedtask",this.editedTask);
        this.editDialog = true;
      },

     closeEdit() {
      this.editDialog = false;
    }
        
  },

  async mounted() {
    this.$store.dispatch('fetchEvents',this.$auth);
  }
};
</script>
