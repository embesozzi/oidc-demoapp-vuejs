// import { UserManager, WebStorageStateStore, User } from 'oidc-client';
import Oidc from 'oidc-client';

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.DEBUG;

let oidcProviderDomain = 'https://gluu.hlgv.net';

const oidcClient = new Oidc.UserManager({
  userStore: new Oidc.WebStorageStateStore(),  
  authority: oidcProviderDomain,
  client_id: 'e6a0f5d1-8c4f-4f8f-8bca-71fd3bb49bff',
  redirect_uri: window.location.origin + '/callback',
  response_type: 'code',
  scope: 'openid profile idm-crud-roles',
  post_logout_redirect_uri: window.location.origin + '/home',
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
export default oidcClient;

