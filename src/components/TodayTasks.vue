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
              <v-list-item v-for="task in todayView" :key="task._id" 
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
              <v-list-item v-for="task in thisweekView" :key="task._id" 
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
              <v-list-item v-for="task in thismonthView" :key="task._id" 
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
      todayView: [],
      thisweekView: [],
      thismonthView: [],
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
        this.filtertodayView();
        this.filterthisweekView();
        this.filterthismonthView();
      },
      deep: true,
      immediate: true,
    }
  },

  methods: {
    convertUTCtoLocalTime (date) {
        let today = new Date();
        let offset = today.getTimezoneOffset() * 60000; 
        return new Date(date.getTime() - offset);
      },

    onDatePickerChange() {
        setTimeout(() => {
          this.formattedDate = new Date(this.date).toLocaleDateString();
          this.editedTask.date=this.date;
          console.log(this.date);
          this.$data.showDatePicker = false;
        }, 10);
      },

    formatDate(date) {
      var t=new Date(date);  
      t=this.convertUTCtoLocalTime(t);
      return t.toDateString();
    },

    filtertodayView() {
      this.todayView = []; 
      let today = new Date();

      const isSameDay = (date1, date2) => {
        console.log("eventdate",date1);
        console.log("today",date2);
        return date1.getUTCFullYear() === date2.getUTCFullYear() &&
               date1.getUTCMonth() === date2.getUTCMonth() &&
               date1.getUTCDate() === date2.getUTCDate();
      };

      // Filter past task not done
        this.events?.filter(e => 
            e.noShow &&
            e.type === "Tasks" && 
            !e.done && 
            new Date(e.date.getUTCDate()) < today.getUTCDate() // Check if e.date is before today
        ).forEach(e => {
            this.todayView.push(e);
            console.log("Today:", today);
            console.log("Task date:", e.date);
        });

      // Filter Tasks for today by date
      this.events?.filter(e => e.type === "Tasks" && !e.done && isSameDay(this.convertUTCtoLocalTime(new Date(e.date)), today))
        .forEach(e => this.todayView.push(e));

      // Filter tasks with morning time
      this.events?.filter(e => e.todayTime === "morning" && !e.done && !this.todayView.includes(e))
        .forEach(e => this.todayView.push(e));

      // Filter Dates & Events for today or all-day events
      this.events?.filter(e => e.type === "Dates & Events" && isSameDay(this.convertUTCtoLocalTime(new Date(e.date)), today) && !e.done && !this.todayView.includes(e))
        .forEach(e => this.todayView.push(e));

      // Filter tasks with night time
      this.events?.filter(e => e.todayTime === "night" && !e.done && !this.todayView.includes(e))
        .forEach(e => this.todayView.push(e));
        console.log("Today",this.todayView);
    },

    filterthisweekView() {
    this.thisweekView = [];
    let today = new Date();
    let dayOfWeek = today.getDay();
    let monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7)); 
    let sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); 

    this.events?.forEach((item) => {
        let itemDate = new Date(item.date);
        
        if ((item.type === "Tasks" || item.type === "Dates & Events") && !item.done) {
            if (itemDate >= monday && itemDate <= sunday) {
                this.thisweekView.push(item);
            }
        }
    });

    this.thisweekView.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });

    console.log("thisweek", this.thisweekView);
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
          if (eventMonth === currentMonth && eventYear === currentYear && !item.done && (item.type === "Tasks" || item.type === "Dates & Events")) {
            this.thismonthView.push(item);
          }
        }
      });
      this.thismonthView.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
        });
    },


    async doneTask(task) {
        const eventId = task._id;

        try {
          const headers = this.$store.getters.getAuth.headers;
          const response = await axios.put(`http://localhost:3000/doneEvent/${eventId}`, {} ,{ headers });
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
        // window.location.reload();
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

<style scoped>
  /* Date Picker */
  .date-picker .v-picker__body {
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .date-picker .v-date-picker-header {
    background-color: #b362bf !important; 
    color: #ffffff !important;
  }

  .date-picker .v-btn:not(.v-btn--active) {
    color: #7a318c !important; 
  }

  .date-picker .v-btn--active {
    background-color: #b362bf !important; 
    color: #ffffff !important;
  }

</style>