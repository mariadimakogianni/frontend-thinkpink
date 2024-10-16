<template>
  <br />
  <br />

  <v-container>
    <v-row class="align-center">
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h2 class="title">Project Sharing</h2>
        <v-btn class="newbutton" @click="createNewProject">Create New Project</v-btn>
      </v-col>
    </v-row>

    <v-container>
      <v-row dense>
        <v-col
          v-for="(project, projectIndex) in projects" :key="project._id" cols="12" md="4" sm="6">
          <v-card class="column">
            <v-card-title class="d-flex align-center">
              <h3>{{ project.title }}</h3>
              <v-icon
                class="delIconList"
                @click="deleteProject(projectIndex)">
                mdi-delete
              </v-icon>

               <v-icon @click="shareProject(projectIndex)">mdi-share-variant</v-icon>

            </v-card-title>

              <v-progress-linear :value="getCompletionPercentage(project)" height="10" color="success"></v-progress-linear>
              <div class="percentage-text">{{ getCompletionPercentage(project) }}% Completed</div>


            <v-card-text>
              <v-list class="innerSquare">
                <v-list-item
                  v-for="(item, itemIndex) in project.items"
                  :key="itemIndex"
                  class="showProjectlist">

                  <div style="width: 100%; display: flex; align-items: center;">
                    <v-checkbox
                      v-model="project.items[itemIndex].done"
                      class="pe-2" 
                      @change="itemDone(projectIndex, itemIndex)">
                    </v-checkbox>

                    <v-list-item-title
                      class="itemtitle"
                      :class="{ crossed: project.items[itemIndex].done }" >
                      {{ item.title }}
                    </v-list-item-title>

                    <v-icon
                      class="delIconItem"
                      @click="deleteItem(projectIndex, itemIndex)">
                      mdi-delete
                    </v-icon>
                  </div>
                </v-list-item>
              </v-list>

              <v-btn class="itembutton" @click="addItem(projectIndex)">
                Add Item
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
    };
  },

  computed: {
    projects() {
      return this.$store.state.Projects;
    }
  },

  watch: {
    projects: {
      handler() {
        console.log('Projects updated:', this.projects);
      },
      deep: true,
      immediate: true,
    },
  },


  methods: {
    getCompletionPercentage(project) {
      if (!project.items.length) return 0;
      const completedTasks = project.items.filter(item => item.done).length;
      const totalTasks = project.items.length;
      return Math.round((completedTasks / totalTasks) * 100);
    },

    async createNewProject() {
      const newProjectTitle = prompt("Enter the title of the new Project:");
      if (newProjectTitle) {
        const newProject = { title: newProjectTitle, items: [] };
        await this.$store.dispatch('createProject', newProject);
      }
    },

   async deleteProject(projectIndex) {
      const projectId = this.projects[projectIndex]._id;
      try {
        const headers = this.$store.getters.getAuth.headers;
        const response = await axios.delete(`http://localhost:3000/deleteProject/${projectId}`, {headers});
        if (response.status === 200) {
          this.$store.commit('deleteProject', projectId);
          console.log('Project deleted successfully:', projectId);
        } else {
          console.error('Failed to delete list on the server');
        }
      } catch (error) {
        console.error('Error deleting Project:', error);
      }
    },

    async addItem(projectIndex) {
        const newItemTitle = prompt("Enter a new item:");
        if (newItemTitle) {
          const project = this.projects[projectIndex];
           if (!project) {
              console.error('project not found at index:', projectIndex);
              return;
            }
            const projectId = project._id;
            console.log('project ID:', projectId); 
            const newItem = { title: newItemTitle };
            //const newItem = { newItemTitle };
          try {
            const headers = this.$store.getters.getAuth.headers;
            const response = await axios.post(`http://localhost:3000/addItemToProject/${projectId}`, newItem, {headers});
            if (response.status === 200) {
              const addedItem = response.data.newItem; 
              this.$store.commit('addItemToProject', { projectId, item: addedItem });
              console.log('project added successfully:', newItem);
            } else {
              console.error('Failed to add item on the server');
            }
          } catch (error) {
            console.error('Error adding item:', error);
          }
        }
      },

      async itemDone(projectIndex, itemIndex) {
        console.log('Checkbox clicked, toggling item done status'); 
          const project = this.projects[projectIndex];
          const item = project.items[itemIndex];
          const projectId = project._id;

          try {
            const headers = this.$store.getters.getAuth.headers;
            const response = await axios.patch(`http://localhost:3000/updateItemDoneProjects/${projectId}/${item._id}`, { done: item.done }, { headers });

            if (response.status === 200) {
              this.$store.commit('setItemDoneProjects', { projectId, itemId: item._id, done: item.done });
            } else {
              console.error('Failed to update item status on the server');
            }
          } catch (error) {
            console.error('Error updating item status:', error);
          }
        },
    
      async deleteItem(projectIndex, itemIndex) {
        const project = this.projects[projectIndex];
        if (!project) {
          console.error('project not found at index:', projectIndex);
          return;
        }
        const projectId = project._id;
        try {
          const headers = this.$store.getters.getAuth.headers;
          const response = await axios.delete(`http://localhost:3000/deleteItemFromProject/${projectId}/${itemIndex}`, {headers});
          if (response.status === 200) {
            this.$store.commit('deleteItemFromProject', { projectId, itemIndex });
            console.log('Item deleted successfully from project:', projectId);
          } else {
            console.error('Failed to delete item on the server');
          }
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      },

  },
   mounted() {
    this.$store.dispatch('fetchProjects');
  }
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

.showProjectlist {
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
  margin-left: auto;
  margin-top: 1px !important;
  color: #e57373; 
  cursor: pointer;
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


</style>