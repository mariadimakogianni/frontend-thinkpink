<template>
  <TodayTasks  v-if='this.$store.state.activeMenu=="today"'/>
  <ViewTasks  v-if='this.$store.state.activeMenu=="tasks"'/>
  <CreateTasks  v-if='this.$store.state.activeMenu=="createNewEvent"'/>
  <MoRoutine v-if='this.$store.state.activeMenu=="routine"'/>
  <ListCheckbox v-if='this.$store.state.activeMenu=="lists"'/>
  <PomodoroTec v-if='this.$store.state.activeMenu=="pomodoro"'/>
  <SpinningWheel v-if='this.$store.state.activeMenu=="spinningwheel"'/>
  <ProjectSharing v-if='this.$store.state.activeMenu=="stprojects"'/>
</template>

<script>
import TodayTasks from "./TodayTasks"
import ViewTasks from "./ViewTasks"
import CreateTasks from "./CreateTasks"
import MoRoutine from "./MoRoutine"
import ListCheckbox from "./ListCheckbox"
import PomodoroTec from "./PomodoroTec"
import SpinningWheel from "./SpinningWheel"
import ProjectSharing from "./ProjectSharing"

export default {
  name: 'PageContent',
  components: { 
  TodayTasks,
  ViewTasks, 
  MoRoutine,
  CreateTasks,
  ListCheckbox,
  PomodoroTec,
  SpinningWheel,
  ProjectSharing
  },

  data: () => ({
}),
  async mounted() {

  //console.log("Hello im page content");
  }

}
</script>

<style>

  body{
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }
    
    .column {
      border-radius: 10px;
      border-radius: 50% 30% 60% 30% / 40% 60% 40% 60%; 
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      padding: 16px;
      margin: 16px 0;
      background-color: #b362bf; 
      color: #ffffff; 
      max-width: 700px;
      display: flex;
      flex-direction: column; 
      align-items: center; 
      

    }

    .showTask {
      border: 1px solid #d1b3d8; 
      border-radius: 10px; 
      margin: 10px auto;
      margin-right: 100px;
      margin-left: 100px;
      align-items: flex-start;
      padding: 10px !important;
      background-color: #f3e5f5; 
      color: #7a318c; 
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

   

    .showTask3 {
      border: 1px solid #FF0000; 
      border-radius: 10px;
      margin: 10px auto;
      margin-right: 100px;
      margin-left: 100px;
      align-items: flex-start;
      padding: 10px;
      background-color: #ffffff; 
      color: #333333; 
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }

    .showTask2 {
      border: 1px solid #B8860B; 
      border-radius: 10px;
      margin: 10px auto;
      margin-right: 100px;
      margin-left: 100px;
      align-items: flex-start;
      padding: 10px;
      background-color: #ffffff; 
      color: #333333; 
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }

    .showTask1 {
      border: 1px solid #008000; 
      border-radius: 10px;
      margin: 10px auto;
      margin-right: 100px;
      margin-left: 100px;
      align-items: flex-start;
      padding: 10px;
      background-color: #ffffff; 
      color: #333333; 
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }

    .innerSquare {
      border-radius: 40px; 
      min-width: 500px;
      background-color: #f3e5f5; 
      padding: 16px;
      max-height: 500px;
      overflow-y: auto;
    }

    .title {
      padding-left: 20px;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      color: #b362bf;
      font-size: 24px;
      margin-bottom: 20px;
    }

        .textForTask {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      white-space: normal;
      display: block;
      color: #000000; 
      font-size: 16px;
      margin-bottom: 10px;
    }

    .description-text {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      overflow: visible !important;
      text-overflow: initial !important;
      color: #7a318c; 
      font-size: 14px;
    }

    .editIcon {
      margin-left: auto; 
      margin-top: 8px;
      color: #b362bf !important ; 
      cursor: pointer;
    }

    .delIcon {
      margin-left: 5px;
      margin-top: 8px;
      color: #e53935 !important ;
      cursor: pointer;
    }

    .doneIcon {
      margin-top: 8px;
      color: #43a047 !important ; 
      cursor: pointer;
    }

    .newbutton {
      background-color: #b362bf; /* Primary purple color */
      color: #fff !important ;
      font-size: 16px;
      text-align: center;
      text-transform: none;
      border: none;
      padding: 10px 20px;
      margin-top: 20px;
      margin-left: 20px;
      cursor: pointer;
      display: block;
      margin-bottom: 10px;
      border-radius: 5px;
    }

    .newbutton:hover {
      background-color: #944ba0; 
    }

    .itembutton {
      margin: 10px;
      float: right;
      background-color: #944ba0; 
      color: #fff !important ;
      font-size: 14px;
      padding: 8px 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .itembutton:hover {
      background-color: #b362bf;
    }


</style>
