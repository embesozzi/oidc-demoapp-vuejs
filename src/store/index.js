import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth';
import users from '@/store/modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users
  },
});