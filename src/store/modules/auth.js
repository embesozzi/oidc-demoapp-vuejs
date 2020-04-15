import { AuthService } from '@/services/AuthService'
import router from '@/router/router'

const defaultState = {
    user: {} 
};
  
const actions = {
     signin: (context) => {
        context.commit('AUTH_REQUEST_PENDING');
        AuthService.signin()
            .catch(function(error){
                context.commit('AUTH_REQUEST_FAILURE', error);
                 //TODO: redirect to login page or page to handle error
            })
    },
    signinRedirectCallback: (context) => {
    // return new Promise((resolve, reject) => {
        context.commit('TOKEN_REQUEST_PENDING');
        AuthService.signinRedirectCallback()
            .then((response) => {
                console.log(response);
                context.commit('TOKEN_REQUEST_SUCCESS', response);
                router.push('/user');
    //            resolve(true)
            })
            .catch(function(error){
                context.commit('TOKEN_REQUEST_FAILURE', error);
                //TODO: redirect to login page or page to handle error
    //            reject(false)
            })
   // })
    },
    signInSilent: (context) => {
         return new Promise((resolve, reject) => {
            context.commit('AUTH_REQUEST_PENDING');
            AuthService.signinSilent()
                .then((response) => {
                    console.log(response);
                    context.commit('AUTH_REQUEST_SUCCESS');
                    //router.push('/user');
                     resolve(true)
                })
                .catch(function(error){
                    context.commit('AUTH_REQUEST_FAILURE', error);
                    //TODO: redirect to login page or page to handle error
                     reject(false)
                })
         })        
    },
    checkAccess: (context) => {
        return new Promise(resolve => {
            const getUserPromise = new Promise(resolve => {
                AuthService.getUser().then(user => {
                    resolve(user)
                }).catch(() => {
                    resolve(null)
                })
            })
            let hasAccess = false
            getUserPromise.then(user => {
                if(user) {
                    hasAccess = true;
                    context.commit('TOKEN_REQUEST_SUCCESS', user);
                }
                resolve(hasAccess)
            })
        })
    }
};
  
const mutations = {
    AUTH_REQUEST_PENDING : (state) => {
        state.user.authResponse = { loading : true };
    },
    AUTH_REQUEST_SUCCESS : (state, data) => {
        state.user.authResponse = data;
    },
    AUTH_REQUEST_FAILURE : (state, error) => {
        state.user.authResponse = { error };
    },
    TOKEN_REQUEST_PENDING : (state) => {
        state.user = { loading : true };
    },
    TOKEN_REQUEST_SUCCESS : (state, payload) => {
        state.user = { token : payload};
    },
    TOKEN_REQUEST_FAILURE : (state, error) => {
        state.user =  { error };
    },
};  
  
const getters = {
    tokenResponse(state) {
        return state.user;
    },
    accessToken(state) {
        return state.user.access_token;
    },
    profile(state){
        return state.user.profile;
    },
    isAuthenticated(state){
        return (state.user);
    }
};
  
export default {
    namespaced: true,
    state: defaultState,
    getters,
    actions,
    mutations
};