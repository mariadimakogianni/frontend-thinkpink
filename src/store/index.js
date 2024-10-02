import { createStore } from 'vuex'
//import { del } from 'vue';
import axios from 'axios'


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
    },
    setEventDone(state, eventId) {
      state.Events[eventId].done = true;
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
        const response = await axios.get('http://localhost:3000/getEvents');
        commit('SET_EVENTS', response.data); 
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
  },

  modules: {
  }
});
