import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

// the global state data of authentication
export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
    };
  },
  mutations,
  actions,
  getters
};
// import the actions, mutations and getters. 
// Imported here to keep the files structured and organized + minimal code in one file