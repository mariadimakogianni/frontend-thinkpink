<template>
<br>
<br>
<br>
<br>

<h2 class="title"> Morning & Night Routine</h2>

<!-- <a>{{$data.Events[3]}}</a> -->


<v-container>
    <v-row>
      <!-- Morning Routine -->
      <v-col cols="12" md="6" v-if="tasksToDo.length">
        <v-card class="column morning-routine">
          <v-card-title>
            <h3>Morning Routine</h3>
          </v-card-title>
          <v-card-text>
            <v-list class="innerSquare">
              <v-list-item v-for="task in tasksToDo" :key="task.title" class="showTaskRoutine">
                <v-list-item-content class="textForTask">
                  <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle class="textForTask description-text">{{ task.description }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon class="editIconRoutine" @click="editTask(task, 'tasksToDo')">mdi-pencil</v-icon>
                    <v-icon class="delIcon" @click="delTask(task, 'tasksEvents')">mdi-delete</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

<!-- Night Routine -->
      <v-col cols="12" md="6" v-if="tasksEvents.length">
        <v-card class="column night-routine">
          <v-card-title>
            <h3>Night Routine</h3>
          </v-card-title>
          <v-card-text>
            <v-list class="innerSquare">
            <v-list-item v-for="task in tasksEvents" :key="task.title" class="showTaskRoutine">
                <v-list-item-content class="textForTask">
                  <v-list-item-title class="textForTask">{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle class="textForTask description-text"> {{ task.description }} </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon class="editIconRoutine" @click="editTask(task, 'tasksEvents')">mdi-pencil</v-icon>
                  <v-icon class="delIcon" @click="delTask(task, 'tasksEvents')">mdi-delete</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="!tasksToDo.length && !tasksEveryDay.length">
      <v-col cols="12">
        <v-alert type="info">No tasks available</v-alert>
      </v-col>
    </v-row>

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

    .morning-routine{
      border-radius: 10px;
        border-radius: 50% 30% 60% 30% / 40% 60% 40% 60%;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        padding: 16px;
        margin: 16px 0;
        background-color: #FFA500;
        color: #fff;
        max-width: 700px;

        
        display: flex;
        flex-direction: column; /* Stack the content vertically */
        align-items: center; /* Center content horizontally */
    }

        .night-routine{
      border-radius: 10px;
        border-radius: 50% 30% 60% 30% / 40% 60% 40% 60%;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        padding: 16px;
        margin: 16px 0;
        background-color: #090254;
        color: #fff;
        max-width: 700px;

        
        display: flex;
        flex-direction: column; /* Stack the content vertically */
        align-items: center; /* Center content horizontally */
    }

    .showTaskRoutine{
        border: 1px solid #FFA500; 
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

    }

    .editIconRoutine{
        align-self: flex-start;
        margin-right: 60px;
        margin-top: 8px; 
        color: #090254;

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
