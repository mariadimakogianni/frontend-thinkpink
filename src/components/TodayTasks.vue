<template>
<br>
<br>
<br>
<br>



<a>{{$data.Events[0]}}</a>
</template>

<script>
import axios from 'axios';

export default {

    data() {
        return {
		Events:"",
	}
    },
async mounted() {
    try {
      const response = await axios.get("http://localhost:3000/getEvents");
      const res = response.data; // Assuming the response is JSON data
      this.$data.Events = res; // Update the component data with the fetched data
      console.log(this.$data.Events[0]);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
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
