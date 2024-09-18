<template>
<br>
<br>
<br>
<br>
  <v-sheet width="800" class="mx-auto">

    <!-- <v-date-picker ref="datePicker" v-if="formSelector==1" v-model='date'></v-date-picker> -->
    

    <v-form ref="form1" v-if="formSelector==1" v-model="formValid">

      <v-select
        v-model="type"
        :items="['Tasks','Routine','Dates & Events']"
        :rules="[v => !!v || 'Item is required']"
        label="Type"
        required
      ></v-select>


      <v-text-field
        v-model="title"
        label="Title"
        :rules="[v => !!v || 'Item is required']"
        required
      ></v-text-field>

      <v-text-field
        v-model="date"
        label="Date & Due Date"
        v-if="type=='Tasks' ||  type=='Dates & Events'"
        @click="this.showDatePicker=1"
        :rules="[v => !!v || 'Item is required']"
        required
      ></v-text-field>

      <v-date-picker v-if="this.showDatePicker" v-model='date' @click:save="onDatePickerChange"></v-date-picker>

      <v-text-field
        v-model="description"
        label="Description"
      ></v-text-field>

      <v-select
         v-if="type=='Routine'"
        v-model="todayTime"
        :items="['morning','night']"
        label="Time of the day"
        required
      ></v-select>

      <v-select
        v-model="frequency"
        :items="['Every Day','One Time','Sometime This Week', 'Sometime This Month','Every Week','Every Month','Every Year','Custom']"
        label="Frequency"
        required
        v-if="type=='Tasks' || type=='Dates & Events'"
      ></v-select>

      <v-checkbox
        v-model="allday"
        v-if="type=='Dates & Events'"
        label="All Day"
      ></v-checkbox>

      <v-text-field
        v-if="!allday && type == 'Dates & Events'"
          v-model="startTime"
          type="time"
          suffix="EET"
          label="Start Time"
        ></v-text-field>

          <v-text-field
        v-if="!allday && type=='Dates & Events'"          
          v-model="endTime"
          type="time"
          suffix="EET"
          label="End Time"
        ></v-text-field>

      <v-text-field
      v-if="frequency=='Custom'"
        v-model="frequency2"
        label="Every X Number of Days"
        required
      ></v-text-field>

      <v-select
        v-model="importance"
        v-if="type=='Tasks' || type=='Dates & Events'"
        :items="['1','2','3']"
        label="Importance"
        required
      ></v-select>

      <div class="d-flex flex-column">
        <v-btn
          color="success"
          class="mt-4"
          block
          @click="create(data)"
        >
          Create
        </v-btn>

        <v-btn
          color="error"
          class="mt-4"
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
  //https://chatgpt.com/c/0bdc33b6-0ee0-4ce4-8e52-a94dad7c2e89
      //Please baby change what it shows and what it saves
import axios from 'axios';
    import { VDatePicker } from 'vuetify/labs/VDatePicker'

export default {
    components: {
        VDatePicker,
    },
    data() {
        return {
        title:"",
        formValid: false,
        showDatePicker: false,
        description:"",
        type:"",
        allday:"",
        frequency:"Every Day",
        importance:"1",
        startTime:"",
        endTime:"",
        formSelector:"1",
        frequency2:"",
        date:new Date(),
        formattedDate:"",
        todayTime:"",

	}
    },
    methods: {
    // Event handler for date picker input
    onDatePickerChange() {
      // Change the formSelector to 2 when the user selects a date
      setTimeout(() => {
            

            //this.formSelector++;
            this.formattedDate=this.date.toLocaleDateString();
            console.log(this.date); // This should now log the updated date
            this.$data.showDatePicker=false;
        }, 10);
      console.log(this.$data);
      /*
    setTimeout(() => {
            this.showDatePicker=false;

            //this.formSelector++;
            this.formattedDate=this.date.toLocaleDateString();
            console.log(this.date); // This should now log the updated date
        }, 10);*/
        },
    reset(){
        this.title=""
        this.description=""
        this.type=""
        this.allday=""
        this.frequency=""
        this.importance="1"
        this.startTime=""
        this.endTime=""
        this.frequency2=""
        this.date=new Date()
        this.formSelector=1;
        this.formValid = false;
    },

    async create(){
      // Check if the form is valid
      if (!this.formValid) {
        // Form is invalid, show validation message
        alert('Form is invalid');
        return; // Exit the function if the form is invalid
      }

      try {

         var mydata={};
          if (this.$data.type=="Bills") 
              this.$data.importance="";
         Object.keys(this.$data).forEach((key) => {
          if(key=="formattedDate" || key=="formSelector")
            return;
          if (this.$data[key] !== "" && this.$data[key] !== undefined) {
          mydata[key] = this.$data[key];
          }});
         mydata.timestamp=new Date();
      console.log(JSON.stringify(mydata));
       // Set the content type header to indicate JSON data
    const headers = { 'Content-Type': 'application/json' };

      var response = await axios.post("http://localhost:3000/createEvent",mydata, { headers });
      console.log(response)
    } catch (error) {
      console.error("An error occurred:", error);
    }
  } 
       

 
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
    console.log(this.date);      
    console.log(this.$refs.form1);     
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
