import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import vuexAlong from 'vuex-along';

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    plugins: [vuexAlong]
});

export default store;