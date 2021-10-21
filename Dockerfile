FROM node:12.14.1-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
LABEL maintainer="Martin Besozzi <mbesozzi@identicum.com>"
ARG GIT_SHA1=unspecified
LABEL git_commit=$GIT_SHA1
ARG BUILD_DATE=unspecified
LABEL build_date=$BUILD_DATE

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# COPY ./entrypoint.sh /docker-entrypoint.d/entrypoint.sh
# RUN chmod +x /docker-entrypoint.d/entrypoint.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
