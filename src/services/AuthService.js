import oidcClient from '@/auth/oidc-client'
//import router from '@/router/router'

export const AuthService = {
    signin() {
        return oidcClient.signinRedirect();
        /**
            .catch(function (err) {
                console.log("SIGN ERROR: " + err);
            })
        **/
    },
    signinSilent() {
        return oidcClient.signinSilent();
    },
    signinRedirectCallback() {
        return oidcClient.signinRedirectCallback();
        /**
          .then( (data) => {
                console.log("success")
                console.log(data)
          }).catch(function(err){
            console.log("Error22: " + err);
          })
        **/  
    },
    getUser() {
        //let self = this;
        return oidcClient.getUser();
    }
}              