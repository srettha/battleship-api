FROM node:10-slim as base
ENV NODE_ENV=production
RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app
USER node
RUN yarn global add sequelize-cli
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --prod && yarn cache clean

FROM base as dev
ENV NODE_ENV=development
ENV PATH=/usr/src/app/node_modules/.bin:$PATH
RUN yarn

FROM base as source
COPY --chown=node:node . .
