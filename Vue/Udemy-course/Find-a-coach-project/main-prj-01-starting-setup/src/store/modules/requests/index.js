import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

// all requests to the coaches
export default {
  namespaced: true,
  state() {
    return {
      requests: []
    };
  },
  mutations,
  actions,
  getters
};
