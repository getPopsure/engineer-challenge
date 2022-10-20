FROM node:18

WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./package*.json /app

# Install app dependencies
RUN npm install -f

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]