<template>

  <br/>
  <br/>
  <div class="spinning-wheel-page">
    <h1 class="title">Task Spinner</h1>
    <h2 class="subtitle">Do you not know where to start? Spin the Wheel</h2>

    <!-- Main Content Container -->
    <div class="main-content">
      <!-- Task Input Form -->
      <div class="task-form">
        <h2>Add Your Tasks</h2>
        <div
          v-for="(task, index) in tasks"
          :key="index"
          class="task-input"
        >
          <v-text-field
            v-model="tasks[index]"
            :label="'Task ' + (index + 1)"
            :disabled="isWheelSpinning || isTaskSelected"
            class="task-input-field"
          ></v-text-field>
          <v-btn
            v-if="tasks.length > 1"
            icon
            @click="removeTask(index)"
            :disabled="isWheelSpinning || isTaskSelected"
            class="remove-task-button"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-btn
          @click="addTask"
          :disabled="tasks.length >= 10 || isWheelSpinning || isTaskSelected"
          class="add-task-button"
        >
          Add Task
        </v-btn>
      </div>

      <!-- Spinning Wheel -->
      <div class="wheel-container">
        <div class="wheel-wrapper">
          <svg
            :viewBox="'0 0 ' + svgSize + ' ' + svgSize"
            class="wheel"
            :style="{ transform: 'rotate(' + currentRotation + 'deg)' }"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g v-for="(task, index) in tasks" :key="index">
              <path
                :d="getSegmentPath(index)"
                :fill="getSegmentColor(index)"
                :id="'segmentPath' + index"
                stroke="#ffffff"
                stroke-width="2"
              ></path>
              <text
                :transform="getTextPosition(index)"
                fill="#ffffff"
                font-size="14"
                font-weight="bold"
                text-anchor="middle"
                alignment-baseline="middle"
              >
                {{ task }}
              </text>
            </g>
          </svg>
          <div class="wheel-pointer"></div>
        </div>
        <!-- Spin Button -->
        <v-btn
          @click="spinWheel"
          :disabled="tasks.length === 0 || isWheelSpinning || isTaskSelected"
          class="spin-button"
        >
          Spin the Wheel
        </v-btn>
      </div>
    </div>

    <!-- Task Announcement Modal -->
    <v-dialog v-model="isTaskSelected" max-width="400px">
      <v-card class="modal-content">
        <v-card-title class="headline">Selected Task</v-card-title>
        <v-card-text>
          <p>{{ selectedTask }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="markTaskAsDone" class="done-button">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>




<script>
export default {
  data() {
    return {
      tasks: [''], // Initialize with one empty task
      selectedTask: '',
      isWheelSpinning: false,
      isTaskSelected: false,
      currentRotation: 0,
      svgSize: 500, // Size of the SVG
    };
  },
  methods: {
    addTask() {
      if (this.tasks.length < 10) {
        this.tasks.push('');
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    spinWheel() {
      if (this.tasks.some((task) => task.trim() === '')) {
        alert('Please fill in all task fields before spinning the wheel.');
        return;
      }
      this.isWheelSpinning = true;

      // Randomly select a task
      const selectedIndex = Math.floor(Math.random() * this.tasks.length);
      const segmentAngle = 360 / this.tasks.length;
      const randomRotation =
        360 * 5 + // 5 full rotations
        (360 - selectedIndex * segmentAngle - segmentAngle / 2);

      // Animate the wheel
      this.currentRotation = 0;
      this.$nextTick(() => {
        this.currentRotation = randomRotation;
      });

      // Wait for animation to finish
      setTimeout(() => {
        this.isWheelSpinning = false;
        this.selectedTask = this.tasks[selectedIndex];
        this.isTaskSelected = true;
      }, 5000); // Match this duration with CSS animation duration
    },
    markTaskAsDone() {
      const index = this.tasks.indexOf(this.selectedTask);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
      this.isTaskSelected = false;
      this.selectedTask = '';
      this.currentRotation = 0;
    },
    getSegmentPath(index) {
      const numSegments = this.tasks.length;
      const anglePerSegment = (2 * Math.PI) / numSegments;
      const startAngle = index * anglePerSegment;
      const endAngle = startAngle + anglePerSegment;
      const radius = this.svgSize / 2;
      const x1 = radius + radius * Math.cos(startAngle);
      const y1 = radius + radius * Math.sin(startAngle);
      const x2 = radius + radius * Math.cos(endAngle);
      const y2 = radius + radius * Math.sin(endAngle);
      const largeArcFlag = anglePerSegment > Math.PI ? 1 : 0;
      return `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
    },
    getSegmentColor(index) {
      const colors = ['#7a318c', '#d63384']; // Dark purple and dark pink
      return colors[index % colors.length];
    },
    getTextPosition(index) {
      const numSegments = this.tasks.length;
      const anglePerSegment = 360 / numSegments;
      const rotation = anglePerSegment * index + anglePerSegment / 2;
      const radius = this.svgSize / 2;
      const textRadius = radius * 0.75; // Position the text along the border
      const x = radius + textRadius * Math.cos((rotation * Math.PI) / 180);
      const y = radius + textRadius * Math.sin((rotation * Math.PI) / 180);
      return `translate(${x}, ${y}) rotate(${rotation})`;
    },
  },
};
</script>




<style scoped>
/* General Styles */
.spinning-wheel-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.title {
  text-align: center;
  color: #b362bf;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #7a318c;
  margin-bottom: 30px;
}

/* Main Content Layout */
.main-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

}

/* Task Input Form */
.task-form {
  background-color: #f3e5f5;
  padding: 20px;
  border: 2px solid #d1b3d8;
  border-radius: 10px;
  width: 45%;
}

.task-form h2 {
  color: #7a318c;
  margin-bottom: 15px;
}

.task-input {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.task-input-field {
  flex: 1;
}

.remove-task-button {
  color: #e57373;
}

.add-task-button {
  background-color: #b362bf !important;
  color: #ffffff !important;
  text-transform: none;
  margin-top: 10px;
}

.add-task-button:disabled {
  background-color: #cccccc !important;
}

/* Wheel Container */
.wheel-container {
  position: relative;
  width: 500px;
  margin: 0 auto;
}

.wheel-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
}

.wheel {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  transition: transform 5s cubic-bezier(0.33, 1, 0.68, 1);
  transform-origin: center center;
}

.wheel-pointer {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 20px solid #e53935;
}

.spin-button {
  background-color: #b362bf !important;
  color: #ffffff !important;
  text-transform: none;
  margin-top: 20px;
  width: 100%;
}

.spin-button:disabled {
  background-color: #cccccc !important;
  cursor: not-allowed;
}

/* Modal Styles */
.modal-content {
  background-color: #f3e5f5 !important;
  text-align: center;
}

.modal-content .headline {
  color: #b362bf;
}

.modal-content p {
  font-size: 24px;
  color: #7a318c;
  margin-bottom: 30px;
}

.done-button {
  background-color: #b362bf !important;
  color: #ffffff !important;
  text-transform: none;
}

.done-button:hover {
  background-color: #944ba0 !important;
}

/* Responsive Design */
@media (max-width: 1000px) {
  .main-content {
    flex-direction: column;
    align-items: center;
  }
  .task-form,
  .wheel-container {
    width: 100%;
    margin-bottom: 20px;
  }
  .wheel-wrapper {
    height: 300px;
  }
}
</style>

