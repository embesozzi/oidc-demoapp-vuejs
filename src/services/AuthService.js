import oidcClient from '@/oidc/oidc-client'
import store from '@/store';

export const AuthService = {
    signin() {
        return oidcClient.signinRedirect();
    },
    signinSilent() {
        return oidcClient.signinSilent();
    },
    signinRedirectCallback() {
        return oidcClient.signinRedirectCallback();
    },
    signOutRedirect() {
       return oidcClient.signoutRedirect();
    },
    getUser() {
        return oidcClient.getUser();
    }
}

oidcClient.events.addUserLoaded(function (user) {  
  console.log('OIDC event addUserLoaded:', arguments);
  console.log('OIDC access token: ', user.access_token)
});

oidcClient.events.addAccessTokenExpiring(function () {
  console.log('OIDC event addAccessTokenExpiring:', arguments);
});

oidcClient.events.addAccessTokenExpired(function () {
  console.log('OIDC event addAccessTokenExpired:', arguments);  
  alert('Session expired. Sign Out processing ...');
  //TODO: Add vuex action for token expired
  store.dispatch('auth/signOut');
});

oidcClient.events.addUserSignedOut(function () {
  alert('Sign Out processing ...');
  console.log('UserSignedOut：', arguments);
  //TODO: Add vuex action for addUserSignedOut
  store.dispatch('auth/signOut');
});