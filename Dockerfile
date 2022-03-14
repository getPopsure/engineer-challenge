FROM docker.io/library/node:17.7.1-alpine3.15 AS build
ENV YARN_CACHE_FOLDER=/usr/local/yarn-cache
VOLUME /usr/local/yarn-cache
ADD . /app
WORKDIR /app
RUN yarn

FROM docker.io/library/node:17.7.1-alpine3.15 AS backend-build
COPY --from=build /app /app/
RUN yarn --cwd /app/backend build && yarn install --production --ignore-scripts --prefer-offline

FROM docker.io/library/node:17.7.1-alpine3.15 AS backend
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG COOKIE_SECRET=feather-cookie-secret
ENV COOKIE_SECRET=${COOKIE_SECRET}
ENV PORT=80
COPY --from=backend-build /app/backend/package.json /app/backend/yarn.lock /app/
COPY --from=backend-build /app/node_modules /app/node_modules/
COPY --from=backend-build /app/backend/build /app/build/
WORKDIR /app
CMD ["node", "build/index.js"]

FROM docker.io/library/node:17.7.1-alpine3.15 AS frontend-build
ARG BACKEND_URL=http://localhost:4000
ENV BACKEND_URL=${BACKEND_URL}
ENV NODE_OPTIONS=--openssl-legacy-provider
COPY --from=build /app /app/
RUN yarn --cwd /app/frontend build

FROM docker.io/library/nginx:1.21.6-alpine AS frontend
COPY --from=frontend-build /app/frontend/build /usr/share/nginx/html/