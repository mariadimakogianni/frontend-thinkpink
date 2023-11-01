<template>
<br>
<br>
<br>
<br>
  <v-sheet width="800" class="mx-auto">

    <v-date-picker ref="datePicker" v-if="formSelector==1" v-model='date'></v-date-picker>

    <v-form ref="form1" v-if="formSelector==2">
      <v-text-field
        v-model="name"
        :rules="[v => '1' || '10 chars or less please']"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="description"
        :rules="[name.lenth <= 10 || '10 chars or less please']"
        label="Description"
      ></v-text-field>

      <v-select
        v-model="type"
        :items="['Today','Bills','Birthdays & Events']"
        :rules="[v => !!v || 'Item is required']"
        label="Type"
        required
      ></v-select>

      <v-checkbox
        v-model="allday"
        label="All Day"
      ></v-checkbox>

      <v-text-field
        v-if="!allday"
          v-model="startTime"
          type="time"
          suffix="EET"
          label="Start Time"
        ></v-text-field>

          <v-text-field
        v-if="!allday"          
          v-model="endTime"
          type="time"
          suffix="EET"
          label="End Time"
        ></v-text-field>

      <v-select
        v-model="frequency"
        :items="['Every Day','Every Week','Every Month','Every Year','Custom']"
        :rules="[v => !!v || 'Item is required']"
        label="Frequency"
        required
      ></v-select>

      <v-text-field
      v-if="frequency=='Custom'"
        v-model="frequency2"
        :rules="[v => '1' || '10 chars or less please']"
        label="Number of Days"
        required
      ></v-text-field>

      <v-select
        v-model="importance"
        :items="['1','2','3']"
        :rules="[v => !!v || 'Item is required']"
        label="Importance"
        required
      ></v-select>

      <div class="d-flex flex-column">
        <v-btn
          color="success"
          class="mt-4"
          block
          @click="validate"
        >
          Validate
        </v-btn>

        <v-btn
          color="error"
          class="mt-4"
          block
          @click="reset"
        >
          Reset Form
        </v-btn>

        <v-btn
          color="warning"
          class="mt-4"
          block
          @click="resetValidation"
        >
          Reset Validation
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>


<script>
//import axios from 'axios';
    import { VDatePicker } from 'vuetify/labs/VDatePicker'

export default {
    components: {
        VDatePicker,
    },
    data() {
        return {
		name:"",
        description:"",
        type:"",
        allday:"",
        frequency:"",
        importance:"1",
        startTime:"",
        endTime:"",
        formSelector:"1",
        frequency2:"3",
        date:new Date(),

	}
    },
    methods: {
    // Event handler for date picker input
    onDatePickerChange() {
      // Change the formSelector to 2 when the user selects a date
      this.formSelector = 2;
    },
  },
async mounted() {
    /*try {
      const response = await axios.get("http://localhost:3000/getEvents");
      const res = response.data; // Assuming the response is JSON data
      this.$data.Events = res; // Update the component data with the fetched data
      console.log(this.$data.Events[0]);
    } catch (error) {
      console.error("An error occurred:", error);
    }*/
     // Access the "OK" button inside the v-date-picker component
    const okButton = this.$refs.datePicker.$el.querySelector('span.v-btn__content[data-no-activator="OK"]');
    if (okButton) {
      // Attach a click event listener to the "OK" button
      okButton.addEventListener('click', this.formSelector=2);
    }
  },
}

</script>

<style>
   @import '../../node_modules/qalendar/dist/style.css';
   .custom-light-theme {
  /* Override the styles to create a light theme */
  background-color: white;
  color: black;
  /* Add more styles to customize the appearance as needed */
}
</style>
