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


                 <!--     
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedTask.description"
                      label="Description"
                      class="form-field"
                    ></v-text-field>
                  </v-col>

                   
                  <template v-if="editedTask.type === 'Tasks'">
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedTask.dueDate"
                        label="Due Date"
                        type="date"
                        :rules="[v => !!v || 'Due Date is required']"
                        required
                        class="form-field"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-select
                        v-model="editedTask.frequency"
                        :items="frequencyOptions"
                        label="Frequency"
                        :rules="[v => !!v || 'Frequency is required']"
                        required
                        class="form-field"
                      ></v-select>
                    </v-col>

                    <v-col cols="12">
                      <v-select
                        v-model="editedTask.importance"
                        :items="importanceOptions"
                        label="Importance"
                        :rules="[v => !!v || 'Importance is required']"
                        required
                        class="form-field"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" v-if="editedTask.frequency === 'Custom'">
                      <v-text-field
                        v-model="editedTask.frequency2"
                        label="Every X Number of Days"
                        type="number"
                        :rules="[v => !!v || 'This field is required']"
                        required
                        class="form-field"
                      ></v-text-field>
                    </v-col>
                  </template>
                    
                  <template v-else-if="editedTask.type === 'Routine'">
                    <v-col cols="12">
                      <v-select
                        v-model="editedTask.todayTime"
                        :items="['morning', 'night']"
                        label="Time of the Day"
                        :rules="[v => !!v || 'Time of the day is required']"
                        required
                        class="form-field"
                      ></v-select>
                    </v-col>
                  </template>
                  
                  <template v-else-if="editedTask.type === 'Dates & Events'">
                   
                      <v-text-field
                        v-model="editedTask.date"
                        label="Date & Due Date"
                        type="date"
                        :rules="[v => !!v || 'Date is required']"
                        required
                        class="form-field"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-select
                        v-model="editedTask.frequency"
                        :items="frequencyOptions"
                        label="Frequency"
                        :rules="[v => !!v || 'Frequency is required']"
                        required
                        class="form-field"
                      ></v-select>
                    </v-col>

                    <v-col cols="12">
                      <v-checkbox
                        v-model="editedTask.allday"
                        label="All Day"
                        class="form-field"
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="6" v-if="!editedTask.allday">
                      <v-text-field
                        v-model="editedTask.startTime"
                        type="time"
                        label="Start Time"
                        required
                        class="form-field"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" v-if="!editedTask.allday">
                      <v-text-field
                        v-model="editedTask.endTime"
                        type="time"
                        label="End Time"
                        required
                        class="form-field"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-select
                        v-model="editedTask.importance"
                        :items="importanceOptions"
                        label="Importance"
                        :rules="[v => !!v || 'Importance is required']"
                        required
                        class="form-field"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" v-if="editedTask.frequency === 'Custom'">
                      <v-text-field
                        v-model="editedTask.frequency2"
                        label="Every X Number of Days"
                        type="number"
                        :rules="[v => !!v || 'This field is required']"
                        required
                        class="form-field"
                      ></v-text-field>
                    </v-col>
                  </template> -->
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
 //  import { cloneDeep } from 'lodash';
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
      editDialog: false, // To toggle the edit dialog visibility
      editedTask: [], // To hold the task being edited
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
    // Watch for changes in the Events data
    events: {
      handler() {
        this.filtertodayView();
        this.filterthisweekView();
        this.filterthismonthView();
      },
      deep: true,
      immediate: true, // Trigger the handler immediately on component mount
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
      //const parsedDate = new Date(date);
      //console.log("parsedDate:",parsedDate)
      var t=new Date(date);  
      return t.toDateString();
    },

    filtertodayView() {
      this.todayView = []; 
      let today = new Date();
      
      const isSameDay = (date1, date2) => {
        return date1.getUTCFullYear() === date2.getUTCFullYear() &&
               date1.getUTCMonth() === date2.getUTCMonth() &&
               date1.getUTCDate() === date2.getUTCDate();
      };

      // Filter Tasks for today by date
      this.events?.filter(e => e.type === "Tasks" && !e.done && isSameDay(new Date(e.date), today))
        .forEach(e => this.todayView.push(e));

      // Filter tasks with morning time
      this.events?.filter(e => e.todayTime === "morning" && !e.done && !this.todayView.includes(e))
        .forEach(e => this.todayView.push(e));

      // Filter Dates & Events for today or all-day events
      this.events?.filter(e => e.type === "Dates & Events" && isSameDay(new Date(e.date), today) && !e.done && !this.todayView.includes(e))
        .forEach(e => this.todayView.push(e));

      // Filter tasks with night time
      this.events?.filter(e => e.todayTime === "night" && !e.done && !this.todayView.includes(e))
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
        if ((item.type === "Tasks" || item.type === "Dates & Events") && !item.done ) {
          if (item.date >= startOfWeek && item.date <= endOfWeek) {
            this.thisweekView.push(item);
            console.log("thisweek",this.thisweekView)
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
          if (eventMonth === currentMonth && eventYear === currentYear && !item.done) {
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
          const response = await axios.put(`http://localhost:3000/doneEvent/${eventId}`);
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

    async saveEdit() {
    if (!this.editedTask || !this.editedTask._id) {
      console.error('No task selected for editing.');
      return;
    }

    const eventId = this.editedTask._id;
    const updatedEvent = { ...this.editedTask };

    try {
      const response = await axios.patch(`http://localhost:3000/editEvent/${eventId}`, updatedEvent);

      if (response.status === 200) {
         this.$store.commit('updateEvent', response.data);
        console.log('Event updated successfully:', response.data);
        this.closeEdit();
      } else {
        console.error('Failed to update event:', response.data);
      }
    } catch (error) {
      console.error('Error updating event:', error.response ? error.response.data.message : error.message);
    }
   
  },

    // saveEdit() {
    //   Object.assign(this.originalTask, this.editedTask);
    //   this.closeEdit();
    // },

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
    this.$store.dispatch('fetchEvents');

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