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
    signOut: (context) => {
        context.commit('LOGOUT_REQUEST_PENDING')
        AuthService.signOutRedirect()
            .then((response) => {
                console.log(response);
                context.commit('LOGOUT_REQUEST_SUCCESS')
             })
             .catch(function(error){
                context.commit('LOGOUT_REQUEST_FAILURE', error);
                //TODO: redirect to login page or page to handle error
            })
    },  
    checkAccess: (context, requiredRole) => {
        return new Promise(resolve => {
            const getUserPromise = new Promise(resolve => {
                AuthService.getUser().then(user => {
                    resolve(user)
                }).catch(() => {
                    resolve(null)
                })
            })
            let statusCode = "UNAUTHORIZED";
            getUserPromise.then(user => {
                if(user && !user.expired) {
                    if(requiredRole) {
                        //TODO: Handled multivalued role required
                        statusCode = (user.profile 
                            && user.profile.role 
                            && user.profile.role.includes(requiredRole[0])) ? "OK" : "FORBIDDEN";
                    }
                    else {
                        statusCode = "OK";
                    } 
                    // Ver de manejar otro estado    
                    context.commit('TOKEN_REQUEST_SUCCESS', user);
                }
                resolve(statusCode)
            })
        })
    }
};
  
const mutations = {
    AUTH_REQUEST_PENDING : (state) => {
        state.user = { loading : true };
    },
    AUTH_REQUEST_SUCCESS : (state, authRequest) => {
        state.user = { auth : authRequest };
    },
    AUTH_REQUEST_FAILURE : (state, error) => {
        state.user = { error };
    },
    TOKEN_REQUEST_PENDING : (state) => {
        state.user = { loading : true };
    },
    TOKEN_REQUEST_SUCCESS : (state, tokenRequest) => {
        state.user = { token : tokenRequest };
    },
    TOKEN_REQUEST_FAILURE : (state, error) => {
        state.user =  { error };
    },
    LOGOUT_REQUEST_PENDING : (state) => {
        state.user = { loading : true };
    },
    LOGOUT_REQUEST_SUCCESS : (state) =>{
        state.user = {};
    },
    LOGOUT_REQUEST_FAILURE : (state, error) => {
        state.user =  { error };
    }
};  
  
const getters = {
    tokenResponse(state) {
        return state.user.token;
    },
    accessToken(state) {
        return state.user.token.access_token;
    },
    profile(state){
        return state.user.token.profile;
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