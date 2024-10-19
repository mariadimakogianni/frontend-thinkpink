<template>
  <br>
  <br>
  <br>
  <br>
  <v-sheet width="800" class="mx-auto form-container">

    <!-- <v-date-picker ref="datePicker" v-if="formSelector==1" v-model='date'></v-date-picker> -->

    <v-form ref="form1" v-if="formSelector==1" v-model="formValid" class="form">

      <v-select
        v-model="type"
        :items="['Tasks','Routine','Dates & Events']"
        :rules="[v => !!v || 'Type is required']"
        label="Type"
        required
        class="form-field"
      ></v-select>

      <v-text-field
        v-model="title"
        label="Title"
        :rules="[v => !!v || 'Title is required', v => v.length <= 50 || 'Title must be less than 50 characters']"
        required
        class="form-field"
      ></v-text-field>

      <v-text-field
        v-model="date"
        label="Date & Due Date"
        v-if="type=='Tasks' ||  type=='Dates & Events'"
        @click="this.showDatePicker=1"
        :rules="[v => !!v || 'Date is required']"
        required
        class="form-field"
      ></v-text-field>

      <v-date-picker
        v-if="this.showDatePicker"
        v-model="date"
        @click:save="onDatePickerChange"
        class="date-picker"
      ></v-date-picker>

      <v-text-field
        v-model="description"
        label="Description"
        class="form-field"
      ></v-text-field>

      <v-select
        v-if="type=='Routine'"
        v-model="todayTime"
        :items="['morning','night']"
        label="Time of the day"
        required
        class="form-field"
      ></v-select>

      <v-select
        v-model="frequency"
        :items="['Every Day','One Time','Every Week','Every Month','Every Year','Custom']"
        label="Frequency"
        required
        v-if="type=='Tasks' || type=='Dates & Events'"
        class="form-field"
      ></v-select>

      <v-checkbox
        v-model="allday"
        v-if="type=='Dates & Events'"
        label="All Day"
        class="form-field"
      ></v-checkbox>

      <v-text-field
        v-if="!allday && type == 'Dates & Events'"
        v-model="startTime"
        type="time"
        suffix="EET"
        label="Start Time"
        class="form-field"
      ></v-text-field>

      <v-text-field
        v-if="!allday && type=='Dates & Events'"
        v-model="endTime"
        type="time"
        suffix="EET"
        label="End Time"
        class="form-field"
      ></v-text-field>

      <v-text-field
        v-if="frequency=='Custom'"
        :rules="[v => !!v || 'Please specify a number', v => /^\d+$/.test(v) || 'Must be a number']"
        v-model="frequency2"
        label="Every X Number of Days"
        required
        class="form-field"
      ></v-text-field>

      <v-select
        v-model="importance"
        v-if="type=='Tasks' || type=='Dates & Events'"
        :items="['1','2','3']"
        label="Importance"
        required
        class="form-field"
      ></v-select>

      <div class="d-flex flex-column button-group">
        <v-btn
          color="success"
          class="mt-4 form-button"
          block
          @click="create(data)"
        >
          Create
        </v-btn>

        <v-btn
          color="error"
          class="mt-4 form-button"
          block
          @click="reset"
        >
          Reset Form
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
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
        title: '',
        formValid: false,
        showDatePicker: false,
        description: '',
        type: '',
        allday: '',
        frequency: 'Every Day',
        importance: '1',
        startTime: '',
        endTime: '',
        formSelector: '1',
        frequency2: '',
        date: new Date(),
        formattedDate: '',
        todayTime: '',
      };
    },
    methods: {
      onDatePickerChange() {
        setTimeout(() => {
          this.formattedDate = this.date.toLocaleDateString();
          this.$data.showDatePicker = false;
        }, 10);
      },
      reset() {
        this.title = '';
        this.description = '';
        this.type = '';
        this.allday = '';
        this.frequency = '';
        this.importance = '1';
        this.startTime = '';
        this.endTime = '';
        this.frequency2 = '';
        this.date = new Date();
        this.formSelector = 1;
        this.formValid = false;
      },

      async create() {
        if (!this.formValid) {
          alert('Form is invalid');
          return;
        }

        try {
          var mydata = {};
          Object.keys(this.$data).forEach((key) => {
            if (key == 'formattedDate' || key == 'formSelector' || key == 'formValid' || key == 'showDatePicker') return;
            if (this.$data[key] !== '' && this.$data[key] !== undefined) {
              mydata[key] = this.$data[key];
            }
          });
          mydata.timestamp = new Date();
          console.log(JSON.stringify(mydata));
          await this.$store.dispatch('refreshTokenIfNeeded');
          const headers = this.$store.getters.getAuth.headers;
          var response = await axios.post('https://localhost:3000/createEvent', mydata, { headers });
          //(response.status==401) && (()=>{alert("You have been logged out. Please login to continue.");window.reload();})

          console.log(response);
          // Check if the HTTP status code is 201
          if (response.status == 201) {
            alert('Task added!');
          this.reset();
          } else {
            alert('Failed to create event. Please try again.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
          alert('An error occurred while creating the event. Please try again later.');
          this.reset();
        }
      },

    },
    async mounted() {
      console.log(this.date);
      console.log(this.$refs.form1);
    },
  };
</script>

<style>
  

  .form-container {
    background-color: #ffffff; 
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

 
  .form {
    max-width: 600px;
    margin: 0 auto;
  }


  .form-field .v-input__slot input {
    background-color: #f3e5f5 !important;
    color: #7a318c !important; 
    border-radius: 8px !important;
  }

  .form-field label {
    color: #b362bf !important;
    font-weight: bold !important;
  }

  .form-field .v-input__control {
    border-bottom: none !important;
  }

  .form-field .v-input__slot::before {
    border-bottom: none !important;
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


  .v-btn.form-button {
    background-color: #b362bf !important; 
    color: #ffffff !important;
    font-size: 16px;
    font-weight: bold;
    text-transform: none;
    border-radius: 8px;
  }

  .v-btn.form-button:hover {
    background-color: #944ba0 !important;
  }


  .button-group {
    margin-top: 20px;
  }


  .form-field .v-icon {
    color: #b362bf !important; 
  }

  .form-field
    .v-input--selection-controls__ripple
    .v-ripple__container {
    background-color: rgba(179, 98, 191, 0.2) !important;
  }


  .form-field .v-messages__message {
    color: #e57373 !important;
    font-style: italic;
  }
</style>
