import { createStore } from 'vuex'
//import { del } from 'vue';
import axios from 'axios'
//import api from '../api.js';

export default createStore({
  state: {
    login_status: 0,
    activeMenu: 'today',
    careGiver: 0,
    Events: null, // Initial state of Events

  },
  
  getters: {
    getEvents(state) {
      return state.Events;
    }
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
  }
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
  },

  modules: {
  }
});
