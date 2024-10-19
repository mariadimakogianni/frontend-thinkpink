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
              <v-list-item v-for="task in morningRoutine" :key="task._id" class="showTask">
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
            <v-list-item v-for="task in nightRoutine" :key="task._id" class="showTask">
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
                      :rules="[v => !!v || 'Title is required', v => v.length <= 50 || 'Title must be less than 50 characters']"
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
                      :rules="[v => !!v || 'Please specify a number', v => /^\d+$/.test(v) || 'Must be a number']"
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
import axios from 'axios';
import { VDatePicker } from 'vuetify/labs/VDatePicker';

export default {
  components: {
      VDatePicker,
    },

    data() {
        return {
          morningRoutine: [],
          nightRoutine: [],
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
        this.filtermorningRoutine();
        this.filternightRoutine();
      },
      deep: true,
      immediate: true,
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
        await this.$store.dispatch('refreshTokenIfNeeded');
        const headers = this.$store.getters.getAuth.headers;
        const response = await axios.delete(`https://localhost:3000/deleteEvent/${event._id}`, { headers });
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
      await this.$store.dispatch('refreshTokenIfNeeded');
      const headers = this.$store.getters.getAuth.headers;
      const response = await axios.patch(`https://localhost:3000/editEvent/${eventId}`, updatedEvent, { headers });

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

