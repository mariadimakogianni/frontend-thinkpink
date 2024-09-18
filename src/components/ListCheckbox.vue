<template>
<br>
<br>
<br>
<br>

<h2 class="title"> Lists</h2>

<!-- <a>{{$data.Events[3]}}</a> -->


<v-container>
    <v-row>
      <!-- To Do List -->
      <v-col cols="12" md="6" v-if="tasksToDo.length">
        <v-card class="column">
          <v-card class="innerSquare">
            <v-card-text>
            <div class="d-flex pa-4">
              <v-checkbox-btn v-model="enabled" class="pe-2"></v-checkbox-btn>
              <v-text-field label="Include files" hide-details></v-text-field>
            </div>
    </v-card-text>
  </v-card>
        </v-card>
      </v-col>


    </v-row>

   

  </v-container>

  

</template>

<script>
//import axios from 'axios';

export default {

    data() {
        return {
            tasksToDo: [
        {
          title: "Buy groceries",
          description: "Milk, Bread, Butter",
          dueDate: "2024-09-20",
        },
        {
          title: "Finish project report",
          description: "Prepare the monthly performance report",
          dueDate: "2024-09-22",
        },
      ],
      tasksEvents: [
        {
          title: "Morning exercise",
          description: "30 minutes of cardio",
          dueDate: "2024-09-21",
          time: "7pm",
        },
        {
          title: "Read a book",
          description: "Read 20 pages of a new book",
          dueDate: "2024-09-21",
          time: "7pm",
        },
      ],
      //Events:"",
      editDialog: false, // To toggle the edit dialog visibility
      editedTask: null, // To hold the task being edited
      originalTask: null, // Reference to the original task object
      originalList: null, // To keep track of which list the task belongs to
            includeFiles: true,
      enabled: false,
    };
  },

   methods: {
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
    closeEdit() {
      this.editDialog = false;
      this.editedTask = null;
      this.originalTask = null;
      this.originalList = null;
    },
  },
};

//async mounted() {

   // try {
  //    const response = await axios.get("http://localhost:3000/getEvents");
   //   const res = response.data; // Assuming the response is JSON data
   //   this.$data.Events = res; // Update the component data with the fetched data
  //    console.log(this.$data.Events[0]);
  //  } catch (error) {
 //     console.error("An error occurred:", error);
  //  }
 // }



</script>

<style>
    .column{
        border-radius: 10px;
        border-radius: 50% 30% 60% 30% / 40% 60% 40% 60%;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        padding: 16px;
        margin: 16px 0;
        background-color: #b362bf;
        color: #fff;
        max-width: 700px;

        
        display: flex;
        flex-direction: column; /* Stack the content vertically */
        align-items: center; /* Center content horizontally */


    }

    .showTask{
        border: 1px solid #b362bf; 
        border-radius: 10px; 
        margin: 10px auto;
         margin-right: 100px;
        margin-left: 100px;
        align-items: flex-start;

    }

    .title{
        padding-left: 20px;
        color: #b362bf ;
    }

    .innerSquare{
          border-radius: 40px; 
          min-width: 400px;

    }

    .editIcon{
        align-self: flex-start;
        margin-right: 60px;
        margin-top: 8px; 
        color: #b362bf;

    }

    .delIcon{
        align-self: flex-start;
        margin-left: auto;
        margin-top: 8px; 
        color: red;

    }

    .textForTask{
        white-space: normal;
        display: block;

    }

    .description-text {
        /* Allow text to wrap and prevent truncation */
        overflow: visible !important;
        text-overflow: initial !important;
}

   @import '../../node_modules/qalendar/dist/style.css';
   .custom-light-theme {
  /* Override the styles to create a light theme */
  background-color: white;
  color: black;
  /* Add more styles to customize the appearance as needed */
}
</style>
