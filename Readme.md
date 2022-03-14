# Feather - Fullstack Engineer code challenge

## Tasks

- [x] On the [backend](./backend), change the GraphQL schema to reflect the [Data structure](#Data-structure)
- [x] On the [frontend](./frontend), fetch the data returned by the GraphQL endpoint with the help of the [Apollo client](https://www.apollographql.com)
- [x] On the [frontend](./frontend), display all the data returned by the endpoint in a table with the help of [tailwindcss](https://tailwindcss.com)
  - [x] At least several fields should be editable in place
  - [x] The table should have pagination and sorting on each of the columns
  - [x] (Bonus) Add a text search input
  - [x] (Bonus) Let the admin filter policies by insurance type or other fields
- [x] (Bonus) Package the app with Docker
- [x] (Bonus) Authenticate admins using login/password
- [x] (Bonus) Create more screens (e.g. customer profile, policy page…)

## Comments

- Both backend and frontend images are built with the same `Dockerfile` using the following command:

```bash
docker build --target backend --tag feather-admin-panel-backend .

docker build --target backend --tag feather-admin-panel-frontend .
```

- Nginx in frontend image is used just as static file server. Another instance should be deployed somewhere for proper setup

- I've implemented a couple of tests for backend and frontend. There could have been a lot more tests added but I'm limited in time

- I haven't used a real database here. Again, I'm limited in time, but I have another test assignment done where I actually did use PostgreSQL with Docker: https://github.com/bakedchicken/n26-test-assignment

## Demo

![](demo.gif)
