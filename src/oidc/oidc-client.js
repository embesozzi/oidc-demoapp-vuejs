import Oidc from 'oidc-client';

Oidc.Log.logger = console;
Oidc.Log.level = (process.env.NODE_ENV === 'production') ? Oidc.Log.ERROR : Oidc.Log.DEBUG;

// OIDC configuration
// let oidcProviderDomain = '$oidc.issuer';
// let clientId = '$oidc.client.id';
let oidcProviderDomain = 'http://host.docker.internal:8080/auth/realms/HrvatskiTelekom';
let clientId = 'f90740e6-7f82-44d9-a255-64347705f562';
let scopes = "openid profile roles api.ht.hr/product"

let instance;

// OIDC Client
export const getOidcClient = () => {
  if (instance) {
      return instance;
  }

  instance = new Oidc.UserManager({
    userStore: new Oidc.WebStorageStateStore(),  
    authority: oidcProviderDomain,
    client_id: clientId,
    redirect_uri: window.location.origin + '/callback',
    response_type: 'code',
    scope: scopes,
    post_logout_redirect_uri: window.location.origin + '/home?action=logout',
    accessTokenExpiringNotificationTime: 10,
    automaticSilentRenew: false,
    filterProtocolClaims: false,
    loadUserInfo: true,
    includeIdTokenInSilentRenew : false
  });
  return instance;
}
