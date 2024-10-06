<template>
  <br />
  <br />

  <v-container>
    <v-row class="align-center">
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h2 class="title">My Lists</h2>
        <v-btn class="newbutton" @click="createNewList">Create New List</v-btn>
      </v-col>
    </v-row>

    <v-container>
      <v-row dense>
        <v-col
          v-for="(list, listIndex) in lists" :key="list._id" cols="12" md="4" sm="6">
          <v-card class="column">
            <v-card-title class="d-flex align-center">
              <h3>{{ list.title }}</h3>
              <v-icon
                class="delIconList"
                @click="deleteList(listIndex)"
              >
                mdi-delete
              </v-icon>
            </v-card-title>

            <v-card-text>
              <v-list class="innerSquare">
                <v-list-item
                  v-for="(item, itemIndex) in list.items"
                  :key="itemIndex"
                  class="showItemlist">

                  <div style="width: 100%; display: flex; align-items: center;">
                    <v-checkbox
                      v-model="list.items[itemIndex].done"
                      class="pe-2" >
                    </v-checkbox>

                    <v-list-item-title
                      class="itemtitle"
                      :class="{ crossed: list.items[itemIndex].done }" >
                      {{ item.title }}
                    </v-list-item-title>

                    <v-icon
                      class="delIconItem"
                      @click="deleteItem(listIndex, itemIndex)">
                      mdi-delete
                    </v-icon>
                  </div>
                </v-list-item>
              </v-list>

              <v-btn class="itembutton" @click="addItem(listIndex)">
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
    lists() {
      return this.$store.state.Lists;
    }
  },

  watch: {
    lists: {
      handler() {
        console.log('Lists updated:', this.lists);
      },
      deep: true,
      immediate: true,
    },
  },

  // created() {
  //   this.fetchLists();
  // },

  methods: {
    async createNewList() {
      const newListTitle = prompt("Enter the title of the new list:");
      if (newListTitle) {
        const newList = { title: newListTitle, items: [] };
        await this.$store.dispatch('createList', newList);
      }
    },
   async deleteList(listIndex) {
      const listId = this.lists[listIndex]._id;
      try {
        const response = await axios.delete(`http://localhost:3000/deleteList/${listId}`);
        if (response.status === 200) {
          this.$store.commit('deleteList', listId);
          console.log('List deleted successfully:', listId);
        } else {
          console.error('Failed to delete list on the server');
        }
      } catch (error) {
        console.error('Error deleting list:', error);
      }
    },

    async addItem(listIndex) {
        const newItemTitle = prompt("Enter a new item:");
        if (newItemTitle) {
          const list = this.lists[listIndex];
           if (!list) {
              console.error('List not found at index:', listIndex);
              return;
            }
            const listId = list._id;
            console.log('List ID:', listId); 
            const newItem = { title: newItemTitle };
            //const newItem = { newItemTitle };
          try {

            const response = await axios.post(`http://localhost:3000/addItemToList/${listId}`, newItem);
            if (response.status === 200) {
              const addedItem = response.data.newItem; 
              this.$store.commit('addItemToList', { listId, item: addedItem });
              console.log('Item added successfully:', newItem);
            } else {
              console.error('Failed to add item on the server');
            }
          } catch (error) {
            console.error('Error adding item:', error);
          }
        }
      },
    
      async deleteItem(listIndex, itemIndex) {
        const list = this.lists[listIndex];
        if (!list) {
          console.error('List not found at index:', listIndex);
          return;
        }
        const listId = list._id;
        try {
          const response = await axios.delete(`http://localhost:3000/deleteItemFromList/${listId}/${itemIndex}`);
          if (response.status === 200) {
            this.$store.commit('deleteItemFromList', { listId, itemIndex });
            console.log('Item deleted successfully from list:', listId);
          } else {
            console.error('Failed to delete item on the server');
          }
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      },

  },
   mounted() {
    this.$store.dispatch('fetchLists');
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
