import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        logined: false,
        token: null,
        currentUser: null
    },
    getters: {
        logined: state => state.logined,
        token: state => state.token,
        currentUser: state => state.currentUser
    },
    mutations: {

    }
});

export default store;