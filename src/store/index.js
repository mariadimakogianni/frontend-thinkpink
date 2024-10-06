import { createStore } from 'vuex'
//import { del } from 'vue';
import axios from 'axios'
//import api from '../api.js';

export default createStore({
  state: {
    login_status: 0,
    activeMenu: 'today',
    careGiver: 0,
    Events: null, 
    Lists: null, 

  },
  
  getters: {
    getEvents(state) {
      return state.Events;
    },
    getLists(state) {
      return state.Lists;
    },
  },

  mutations: {
    SET_EVENTS(state, events) {
      state.Events = events;
      this.Events.date=new Date(this.Events.date);
    },
    setEventDone(state, eventId) {
      const eventIndex = state.Events.findIndex(event => event._id === eventId);
      if (eventIndex !== -1) {
      state.Events[eventIndex].done = true;
    }
  },
    updateEvent(state, updatedEvent) {
      const index = state.Events.findIndex(event => event._id === updatedEvent._id);
      if (index !== -1) {
        state.Events[index] = updatedEvent;
      }
    },
    deleteEvent(state, eventId) {
      const eventIndex = state.Events.findIndex(event => event._id === eventId);
      if (eventIndex !== -1) {
        state.Events.splice(eventIndex, 1); 
      }
    },
    
    SET_LISTS(state, lists) {
      state.Lists = lists;
    },
    addList(state, list) {
      state.Lists.push(list);
    },
     deleteList(state, listId) {
      const index = state.Lists.findIndex(list => list._id === listId);
      if (index !== -1) {
        state.Lists.splice(index, 1);
      }
    },

    addItemToList(state, { listId, item }) {
      const list = state.Lists.find(list => list._id === listId);
      if (list) {
        list.items.push(item);
      }
    },
    deleteItemFromList(state, { listId, itemIndex }) {
      const list = state.Lists.find(list => list._id === listId);
      if (list && itemIndex >= 0 && itemIndex < list.items.length) {
        list.items.splice(itemIndex, 1);
      }
    },
  },

  actions: {
    async fetchEvents({ commit }) {
      try {
       // const response = await this.$api.get('/getEvents');
        const response = await axios.get('http://localhost:3000/getEvents');
        console.log(response);
        commit('SET_EVENTS', response.data); 
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
    async fetchLists({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/getLists');
        console.log('fetchLists response:', response);
        commit('SET_LISTS', response.data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    },
     async createList({ commit }, newList) {
      try {
        const response = await axios.post('http://localhost:3000/createList', newList);
        if (response.status === 201) {
          newList._id = response.data.listId;
          commit('addList', newList);
        } else {
          console.error('Failed to create list on the server');
        }
      } catch (error) {
        console.error('Error creating list:', error);
      }
    },
  },

  modules: {
  }
});
