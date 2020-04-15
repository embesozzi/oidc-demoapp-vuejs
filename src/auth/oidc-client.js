// import { UserManager, WebStorageStateStore, User } from 'oidc-client';
import Oidc from 'oidc-client';
//import Vue from 'vue'

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.DEBUG;
// response_type: 'code',
// response_type: 'id_token token',
let oidcProviderDomain = 'https://gluu.hlgv.net';

const oidcClient = new Oidc.UserManager({
  userStore: new Oidc.WebStorageStateStore(),  
  authority: oidcProviderDomain,
  client_id: 'e6a0f5d1-8c4f-4f8f-8bca-71fd3bb49bff',
  redirect_uri: window.location.origin + '/callback',
  response_type: 'code',
  scope: 'openid profile',
  post_logout_redirect_uri: window.location.origin + '/index.html',
  silent_redirect_uri: window.location.origin + '/callback-silent',
  accessTokenExpiringNotificationTime: 10,
  automaticSilentRenew: false,
  filterProtocolClaims: false,
  loadUserInfo: true,
  includeIdTokenInSilentRenew : false,
  metadata: {
      issuer: oidcProviderDomain,
      authorization_endpoint: oidcProviderDomain + "/oxauth/restv1/authorize",
      userinfo_endpoint: oidcProviderDomain + "/oxauth/restv1/userinfo",
      end_session_endpoint: oidcProviderDomain + "/oxauth/restv1/end_session",
      jwks_uri: oidcProviderDomain + "/oxauth/restv1/jwks",
      token_endpoint: oidcProviderDomain + '/oxauth/restv1/token'
  }
})

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

oidcClient.events.addUserLoaded(function (user) {  
  console.log('New User Loaded：!!!!!', arguments);
  console.log('Acess_token: ', user.access_token)
});

oidcClient.events.addAccessTokenExpiring(function () {
  console.log('AccessToken Expiring：', arguments);
});

oidcClient.events.addAccessTokenExpired(function () {
  console.log('AccessToken Expired：', arguments);  
  alert('Session expired. Going out!');
  oidcClient.signoutRedirect().then(function (resp) {
    console.log('signed out', resp);
  }).catch(function (err) {
    console.log(err)
  })
});

oidcClient.events.addSilentRenewError(function () {
  console.error('Silent Renew Error：', arguments);
});

oidcClient.events.addUserSignedOut(function () {
  alert('Going out!');
  console.log('UserSignedOut：', arguments);  
  oidcClient.signoutRedirect().then(function (resp) {
    console.log('signed out', resp);
  }).catch(function (err) {
    console.log(err)
  })
});

export default oidcClient;

