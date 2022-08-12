FROM node:16.9.1

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 4001

CMD [ "yarn", "start" ]
