# oidc-demoapp-vuejs
Vuejs OpenID Connect demo application using library [oidc-client](https://github.com/IdentityModel/oidc-client-js). Authentication flow information is handled by Vuex.

Support:
* OIDC Authentication (Auth Code + PCKE)
* Token negotiation
* OIDC Endsession
* OAuth API Call
* App routes: public, requires autentication or role base control

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