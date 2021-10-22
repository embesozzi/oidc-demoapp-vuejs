# Vuejs OIDC Demo
Vuejs OpenID Connect demo application using library [oidc-client](https://github.com/IdentityModel/oidc-client-js). Authentication flow data is handled by Vuex.

Support:
* OpenID Connect Authentication (Auth Code + PCKE)
* Token negotiation
* OpenID Connect Endsession
* OAuth API Call

## Run

### Run locally

#### Clone repository
```
git clone git@github.com:https://github.com/embesozzi/oidc-demoapp-vuejs.git
```

#### Configure

- Create and configure env file base on the env.template


#### Execute
```
npm run serve
```

- You can access to the UI on http://hostname:8080/

### Run as container

### Run as Docker
```
docker run -d \
	--name oidc-demoapp-vuejs \
	-p xxxx:80 \
   -v $(pwd)/portal/config.js:/usr/share/nginx/html/config.js 
	embesozzi/oidc-demoapp-vuejs:latest
```
