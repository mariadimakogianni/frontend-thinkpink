<template>
  <br>
  <br>
  <br>
  <v-container class="pomodoro-timer">
    <h1 class="title">Pomodoro</h1>

    <v-row class="card-container" justify="space-between">
      <!-- Settings Card -->
      <v-col cols="12" md="5">
        <v-card class="settings-card">
          <v-card-title>
            <h2>Settings</h2>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model.number="totalLaps"
              label="Number of Laps"
              type="number"
              min="1"
            ></v-text-field>
            <v-text-field
              v-model.number="studyDuration"
              label="Study Time (minutes)"
              type="number"
              min="1"
            ></v-text-field>
            <v-text-field
              v-model.number="breakDuration"
              label="Break Time (minutes)"
              type="number"
              min="1"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click="startTimer"
              :disabled="isTimerRunning"
              class="start-button"
            >
              Start
            </v-btn>
            <v-btn @click="openLofiMusic" class="lofi-button">
              Lofi Music
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Timer Display Card -->
      <v-col cols="12" md="5" v-if="isTimerVisible">
        <v-card class="timer-card">
          <v-card-title>
            <h2>{{ currentPhase }} Time</h2>
          </v-card-title>
          <v-card-text>
            <p class="time">{{ formattedTime }}</p>
            <p>Lap {{ currentLap }} of {{ totalLaps }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="isTimerRunning"
              @click="pauseTimer"
              class="pause-button"
            >
              Stop
            </v-btn>
            <v-btn
              v-else
              @click="resumeTimer"
              class="resume-button"
            >
              Restart
            </v-btn>
            <v-btn @click="resetTimer" class="reset-button">
              Reset
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Notification Dialog -->
    <v-dialog v-model="notificationVisible" max-width="400px">
      <v-card class="notification-card">
        <v-card-title class="headline">
          {{ notificationMessage }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeNotification">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      totalLaps: 4,
      studyDuration: 25,
      breakDuration: 5,
      currentLap: 1,
      isTimerRunning: false,
      isTimerVisible: false,
      currentPhase: 'Study',
      timeRemaining: 0,
      timerInterval: null,
      notificationMessage: '',
      notificationVisible: false, 
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timeRemaining / 60)
        .toString()
        .padStart(2, '0');
      const seconds = (this.timeRemaining % 60)
        .toString()
        .padStart(2, '0');
      return `${minutes}:${seconds}`;
    },
  },
  methods: {
    startTimer() {
      if (this.totalLaps < 1) return;
      this.isTimerRunning = true;
      this.isTimerVisible = true;
      this.currentLap = 1;
      this.currentPhase = 'Study';
      this.setTimeRemaining();
      this.runTimer();
    },
    pauseTimer() {
      clearInterval(this.timerInterval);
      this.isTimerRunning = false;
    },
    resumeTimer() {
      this.isTimerRunning = true;
      this.runTimer();
    },
    resetTimer() {
      clearInterval(this.timerInterval);
      this.isTimerRunning = false;
      this.isTimerVisible = false;
      this.timeRemaining = 0;
      this.currentLap = 1;
      this.currentPhase = 'Study';
    },
    setTimeRemaining() {
      if (this.currentPhase === 'Study') {
        this.timeRemaining = this.studyDuration * 60;
      } else {
        // Double the break time every 3 laps
        const isThirdLap = this.currentLap % 3 === 0;
        const breakTime = isThirdLap
          ? this.breakDuration * 2
          : this.breakDuration;
        this.timeRemaining = breakTime * 60;
      }
    },
    runTimer() {
      this.timerInterval = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
        } else {
          this.switchPhase();
        }
      }, 1000);
    },
    switchPhase() {
      if (this.currentPhase === 'Study') {
        // Switch to break phase
        this.currentPhase = 'Break';
        this.setTimeRemaining();
        // Show notification
        this.showNotification('Time for a break!');
      } else {
        // End of break phase
        if (this.currentLap >= this.totalLaps) {
          // All laps completed
          this.isTimerRunning = false;
          this.isTimerVisible = false;
          clearInterval(this.timerInterval);
          // Show congratulation message
          this.showNotification(
            'Congratulations! You have completed all your laps.'
          );
        } else {
          // Start next lap
          this.currentLap++;
          this.currentPhase = 'Study';
          this.setTimeRemaining();
          // Show notification
          this.showNotification('Break over! Time to get back to studying.');
        }
      }
    },
    showNotification(message) {
      this.notificationMessage = message;
      this.notificationVisible = true;
    },
    closeNotification() {
      this.notificationVisible = false;
    },
    openLofiMusic() {
      window.open('https://www.youtube.com/watch?v=lTRiuFIWV54', '_blank');
    },
  },
  beforeUnmount() {
    // Clean up the timer when the component is destroyed
    clearInterval(this.timerInterval);
  },
};
</script>


<style scoped>
    .pomodoro-timer {
      max-width: 1500px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }

    /* Titles */
    .title,
    .settings-card h2,
    .timer-card h2 {
      color: #b362bf;
    }

    /* Card Container */
    .card-container {
      margin-top: 20px;
    }

    /* Cards */
    .v-card {
      background-color: #f3e5f5;
      padding: 16px;
      border: 2px solid #d1b3d8;
      border-radius: 10px;
    }

    .settings-card,
    .timer-card {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .v-card-title h2 {
      padding-bottom: 10px;
      margin: 0;
    }

    /* Inputs */
    .v-text-field {
      margin-bottom: 20px;
    }

    .v-text-field input {
      color: #7a318c;
    }

    /* Buttons */
    .v-btn {
      background-color: #b362bf !important;
      color: white !important;
      margin-right: 10px;
    }

    .v-btn:disabled {
      background-color: #cccccc !important;
    }

    .v-btn:hover {
      background-color: #944ba0 !important;
    }

    /* Timer Display */
    .time {
      font-size: 64px;
      color: #7a318c;
      margin: 20px 0;
    }

    .timer-card p {
      font-size: 18px;
      color: #7a318c;
    }

    /* Notification Dialog */
    .notification-card {
      background-color: #b362bf !important;
      color: white !important;
      text-align: center;
    }

    .notification-card .headline {
      color: white !important;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .card-container {
        flex-direction: column;
        align-items: center;
      }
      .v-col {
        width: 100%;
        margin: 10px 0;
      }
    }
</style>

