FROM node:18-alpine

ENV HOME=/home/node
ENV npm_config_cache=/home/node/npm_cache

# set timezone
RUN apk update
RUN apk upgrade
RUN apk add ca-certificates && update-ca-certificates
RUN apk add --update tzdata
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Clean APK cache
RUN rm -rf /var/cache/apk/*

USER root

# set working dir
WORKDIR $HOME/app

# install deps in tmp folder
COPY package.json $HOME/tmp/
COPY package-lock.json $HOME/tmp/
RUN cd $HOME/tmp/ && npm install

# copy stuff required for npm build to working dir
COPY src $HOME/app/src
COPY tsconfig.json $HOME/app
COPY .eslintrc.json $HOME/app
COPY .prettierrc.json $HOME/app
COPY .prettierignore $HOME/app

RUN cp $HOME/tmp/package.json $HOME/app/package.json
RUN cp $HOME/tmp/package-lock.json $HOME/app/package-lock.json

# copy installed deps to app working dir
RUN mkdir -p $HOME/app/node_modules && cp -r $HOME/tmp/node_modules $HOME/app/


# build project
RUN cd $HOME/app && npm run build

# need to copy this to ensure correct env is used in the app
COPY environment $HOME/app/environment

ARG APP_PORT=3000
EXPOSE $APP_PORT

CMD [ "npm", "start" ]