import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    login_status: 0,
    activeMenu: 'today',
    careGiver: 0,
    Events: null,
    Lists: null,
    auth: null, 
  },
  
  getters: {
    getEvents(state) {
      return state.Events;
    },
    getLists(state) {
      return state.Lists;
    },
    getAuth(state) {
      return state.auth;
    }
  },

  mutations: {
    SET_EVENTS(state, events) {
      state.Events = events;
      state.Events.forEach(event => {
        event.date = new Date(event.date);
      });
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
      if (!Array.isArray(state.Lists)) {
        state.Lists = [];
      }
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
        if (!Array.isArray(list.items)) {
          list.items = [];
        }
        list.items.push(item);
      }
    },
    deleteItemFromList(state, { listId, itemIndex }) {
      const list = state.Lists.find(list => list._id === listId);
      if (list && itemIndex >= 0 && itemIndex < list.items.length) {
        list.items.splice(itemIndex, 1);
      }
    },
    setAuth(state, auth) {
      state.auth = auth;
    }
  },

  actions: {
    async fetchEvents({ state, commit }) {
      try {
        if (!state.auth || !state.auth.headers) {
          throw new Error('Auth headers are not available');
        }
        const headers = state.auth.headers;
        console.log(state.auth.headers);
        const response = await axios.get('http://localhost:3000/getEvents', { headers });
        commit('SET_EVENTS', response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
    async fetchLists({ state, commit }) {
      try {
        if (!state.auth || !state.auth.headers) {
          throw new Error('Auth headers are not available');
        }
        const headers = state.auth.headers;
        const response = await axios.get('http://localhost:3000/getLists', { headers });
        commit('SET_LISTS', response.data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    },
    async createList({ state, commit }, newList) {
      try {
        if (!state.auth || !state.auth.headers) {
          throw new Error('Auth headers are not available');
        }
        const headers = state.auth.headers;
        const response = await axios.post('http://localhost:3000/createList', newList, { headers });
        if (response.status === 201) {
          newList._id = response.data.listId;
          commit('addList', newList);
        } else {
          console.error('Failed to create list on the server');
        }
      } catch (error) {
        console.error('Error creating list:', error);
      }
    }
  },

  modules: {
    // If you have modules, add them here
  }
});
