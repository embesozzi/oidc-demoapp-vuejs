import { ApiService } from '@/services/ApiService'

const defaultState = {
    user: null
}

const actions = {
    getUser: (context) => {
        context.commit('GET_USER_PENDING');
        ApiService.getUser()
            .then((response) => {
                context.commit('GET_USER_SUCCESS', response.data);               
            },
            (error) => {
                context.commit('GET_USER_FAILURE', error);
            })
    }
}

const mutations = {
    GET_USER_PENDING : (state) => {
        state.user = { loading : true };
    },
    GET_USER_SUCCESS : (state, user) => {
        state.user = { item : user };
    },
    GET_USET_FAILURE : (state, error) => {
        state.user = { error };
    }
}

const getters = {
    user(state) {
        return state.user;
    }
}

export default {
    namespaced: true,
    state: defaultState,
    getters,
    actions,
    mutations
};