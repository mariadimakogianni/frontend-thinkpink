<template>
  <br/>
  <br/>

  <v-container>
    <v-row class="align-center">
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h2 class="title">My Projects</h2>
        <v-btn class="newbutton" @click="createNewProject">Create New Project</v-btn>
      </v-col>
    </v-row>

    <v-container>
      <v-row dense>
        <v-col
          v-for="(project, projectIndex) in itemlists"
          :key="projectIndex"
          cols="12" md="4" sm="6"
        >
          <v-card class="column">
            <v-card-title class="d-flex align-center">
              <h3>{{ project.title }}</h3>
              <v-spacer></v-spacer>
              <!-- Share Button -->
                <v-icon class="shareIcon" @click="shareProject(projectIndex)">mdi-share-variant</v-icon>
           
              <!-- Delete Project Icon -->
              <v-icon
                class="delIconList"
                @click="deleteProject(projectIndex)"
              >
                mdi-delete
              </v-icon>
            </v-card-title>

            <v-card-text>
              <!-- Progress Bar -->
              <v-progress-linear :value="getCompletionPercentage(project)" height="10" color="success"></v-progress-linear>
              <div class="percentage-text">{{ getCompletionPercentage(project) }}% Completed</div>

              <!-- Task List -->
              <v-list class="innerSquare">
                <v-list-item
                  v-for="(item, idx) in project.items"
                  :key="idx"
                  class="showItemlist">

                  <div style="width: 100%; display: flex; align-items: center;">
                    <v-checkbox
                      v-model="item.done"
                      class="pe-2" >
                    </v-checkbox>

                    <v-list-item-title
                      class="itemtitle"
                      :class="{ crossed: item.done }" >
                      {{ item.title }}
                    </v-list-item-title>

                    <v-icon
                      class="delIconItem"
                      @click="deleteItem(projectIndex, idx)">
                      mdi-delete
                    </v-icon>
                  </div>
                </v-list-item>
              </v-list>

              <v-btn class="itembutton" @click="addItem(projectIndex)">
                Add Task
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      itemlists: [
        {
          title: "Project Alpha",
          items: [
            {
              title: "Define project scope",
              done: true,
            },
            {
              title: "Gather requirements",
              done: false,
            },
          ],
        },
      ],
    };
  },
  methods: {
    // Add a new task to the specific project
    addItem(projectIndex) {
      const newItem = prompt("Enter a new task:");
      if (newItem) {
        this.itemlists[projectIndex].items.push({ title: newItem, done: false });
      }
    },
    // Create a new project (adds a new empty project)
    createNewProject() {
      const newProjectTitle = prompt("Enter the title of the new project:");
      if (newProjectTitle) {
        this.itemlists.push({
          title: newProjectTitle,
          items: [], // Start with an empty list of tasks
        });
      }
    },
    // Delete a specific task from a project
    deleteItem(projectIndex, itemIndex) {
      this.itemlists[projectIndex].items.splice(itemIndex, 1);
    },
    // Delete an entire project
    deleteProject(projectIndex) {
      this.itemlists.splice(projectIndex, 1);
    },
    // Calculate the completion percentage of a project
    getCompletionPercentage(project) {
      if (!project.items.length) return 0;
      const completedTasks = project.items.filter(item => item.done).length;
      const totalTasks = project.items.length;
      return Math.round((completedTasks / totalTasks) * 100);
    },
    // Share the project with a colleague
    shareProject(projectIndex) {
      const email = prompt("Enter your colleague's email address:");
      if (email) {
        // Implement the sharing logic here
        alert(`Project "${this.itemlists[projectIndex].title}" shared with ${email}`);
      }
    },
  },
};
</script>


<style scoped>
    .column {
      border-radius: 10px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      padding: 16px;
      margin: 16px 0;
      background-color: #b362bf; /* Light pink background */
      color: #ffe3ec; /* Dark purple text */
      max-width: 600px;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }

    .showItemlist {
      display: flex;
      align-items: center;
      padding: 8px 0;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }

    .crossed {
      text-decoration: line-through;
      color: #999;
    }

    .delIconItem {
      color: #e57373; 
      font-size: 24px;
      margin-top: -20px;
      cursor: pointer;
    }

    .delIconList {
      align-self: flex-start;
      margin-left: 10px;
      margin-top: 1px !important;
      color: #e57373; 
      cursor: pointer;
    }

    .shareIcon {
      align-self: flex-start;
      color: #7a318c;
      cursor: pointer;
      margin-right: 10px;
      margin-left: 10px;

    }

    .itemtitle {
      margin-top: -19px;
      margin-right: 20px;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      color: #000; 
    }

    .innerSquare {
      background-color: #f3e5f5; /* Light purple */
      border-radius: 8px;
      padding: 8px;
    }

    .percentage-text {
      font-size: 14px;
      color: #000;
      margin-top: 8px;
      margin-bottom: 8px;
    }
</style>
