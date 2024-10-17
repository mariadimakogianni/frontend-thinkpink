import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    login_status: 0,
    activeMenu: 'today',
    careGiver: 0,
    Events: null,
    Lists: null,
    Projects: null,
    auth: null, 
    keycloak: null,
  },
  
  getters: {
    getEvents(state) {
      return state.Events;
    },
    getLists(state) {
      return state.Lists;
    },
    getProjects(state) {
      return state.Projects;
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

    setItemDoneLists(state, { listId, itemId, done }) {
      const list = state.Lists.find(list => list._id === listId);
      if (list) {
        const item = list.items.find(item => item._id === itemId);
        if (item) {
          item.done = done;
        }
      }
    },

    SET_PROJECTS(state, projects) {
      state.Projects = projects;
    },
    addProject(state, project) {
      if (!Array.isArray(state.Projects)) {
        state.Projects = [];
      }
      state.Projects.push(project);
    },
    deleteProject(state, projectId) {
      const index = state.Projects.findIndex(project => project._id === projectId);
      if (index !== -1) {
        state.Projects.splice(index, 1);
      }
    },
    addItemToProject(state, { projectId, item }) {
      const project = state.Projects.find(project => project._id === projectId);
      if (project) {
        if (!Array.isArray(project.items)) {
          project.items = [];
        }
        project.items.push(item);
      }
    },
    setItemDoneProjects(state, { projectId, itemId, done }) {
      const project = state.Projects.find(project => project._id === projectId);
      if (project) {
        const item = project.items.find(item => item._id === itemId);
        if (item) {
          item.done = done;
        }
      }
    },
    deleteItemFromProject(state, { projectId, itemIndex }) {
      const project = state.Projects.find(project => project._id === projectId);
      if (project && itemIndex >= 0 && itemIndex < project.items.length) {
        project.items.splice(itemIndex, 1);
      }
    },

    updateProjectSharedWith(state, { projectId, sharedWith }) {
      const project = state.Projects.find((project) => project._id === projectId);
      if (project) {
        project.sharedWith = sharedWith;
      }
    },

    setAuth(state, auth) {
      state.auth = auth;
    },
    setKeycloak(state, keycloak) {
      state.keycloak = keycloak;
    },
  },

  actions: {

    async refreshTokenIfNeeded({ state, commit }) {
      const keycloak = state.keycloak;
      if (!keycloak) {
        console.error('Keycloak is not initialized');
        return;
      }
      try {
        const refreshed = await keycloak.updateToken(30);
        if (refreshed) {
          console.log('Token was refreshed in refreshTokenIfNeeded action');

          commit('setAuth', {
            ...state.auth,
            token: keycloak.token,
            refreshToken: keycloak.refreshToken,
          });
        } else {
          console.log('Token is still valid, no refresh needed');
        }
      } catch (error) {
        console.error('Failed to refresh token', error);
        await keycloak.logout();
      }
    },

    async fetchEvents({ state, commit, dispatch }) {
      try {
        if (!state.auth || !state.auth.headers) {
          throw new Error('Auth headers are not available');
        }
        await dispatch('refreshTokenIfNeeded');
        const headers = state.auth.headers;
        console.log(state.auth.headers);
        const response = await axios.get('http://localhost:3000/getEvents', { headers });
        commit('SET_EVENTS', response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
    async fetchLists({ state, commit, dispatch }) {
      try {
        if (!state.auth || !state.auth.headers) {
          throw new Error('Auth headers are not available');
        }
        await dispatch('refreshTokenIfNeeded');
        const headers = state.auth.headers;
        const response = await axios.get('http://localhost:3000/getLists', { headers });
        commit('SET_LISTS', response.data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    },

    async fetchProjects({ state, commit, dispatch }) {
      try {
        if (!state.auth || !state.auth.headers) {
          throw new Error('Auth headers are not available');
        }
        await dispatch('refreshTokenIfNeeded');
        const headers = state.auth.headers;
        const response = await axios.get('http://localhost:3000/getProjects', { headers });
        commit('SET_PROJECTS', response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },

    async createList({ state, commit, dispatch }, newList) {
      try {
        if (!state.auth || !state.auth.headers) {
          throw new Error('Auth headers are not available');
        }
        await dispatch('refreshTokenIfNeeded');
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
    },

      async createProject({ state, commit, dispatch }, newProject) {
      try {
        if (!state.auth || !state.auth.headers) {
          throw new Error('Auth headers are not available');
        }
        await dispatch('refreshTokenIfNeeded');
        const headers = state.auth.headers;

        const userId = state.auth.userId; 
        const userEmail = state.auth.email;
        
        newProject.ownerId = userId;
        newProject.ownerEmail = userEmail;

        const response = await axios.post('http://localhost:3000/createProject', newProject, { headers });
        if (response.status === 201) {
          newProject._id = response.data.projectId;
          commit('addProject', newProject);
        } else {
          console.error('Failed to create Project on the server');
        }
      } catch (error) {
        console.error('Error creating Project:', error);
      }
    },

  },

  modules: {
   
  }
});
