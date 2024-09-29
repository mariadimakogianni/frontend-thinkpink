import { createStore } from 'vuex'
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
    state.events[eventId].done = true;
  },
    deleteEvent(state, eventId) {
      Vue.delete(state.events, eventId); 
    },
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
