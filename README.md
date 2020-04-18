# Vuejs OIDC Demo Application
Vuejs OpenID Connect demo application using library [oidc-client](https://github.com/IdentityModel/oidc-client-js). Authentication flow data is handled by Vuex.

Support:
* OpenID Connect Authentication (Auth Code + PCKE)
* Token negotiation
* OpenID Connect Endsession
* OAuth API Call
* App pages are:
    * Public 
    * Private: 
        *   Required autentication
        *   Required user's role based on token scopes


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