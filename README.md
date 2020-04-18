# oidc-demoapp-vuejs
Vuejs OpenID Connect demo application using library [oidc-client](https://github.com/IdentityModel/oidc-client-js). Authentication flow information is handled by Vuex.

Support:
* OpenID Connect  Authentication (Auth Code + PCKE)
* Token negotiation
* OpenID Connect  Endsession
* OAuth API Call
* App pages are: 
** Public 
** Private: Requires autentication and requires role based scopes token

# Deployment

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```