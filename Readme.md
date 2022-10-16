# Feather Take Home Assessment

Take home assessment for the role of Senior Frontend Engineer.

To check the requirements, please refer to [Requirements page](docs/requirements.md). For the Frontend requirements, refer to the [Frontend page](docs/frontend-readme.md).

## Development

### Install the project

In order to start the development, some initial setup is required:

1. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine
2. Set up the environment variables

```bash
cp ./backend/.env.example ./backend/.env
```

3. Build and run the Docker image:

```bash
cd backend
docker-compose build
```

4. On a new terminal, run the migration and the seed script to add initial data:

```bash
cd backend
docker compose exec backend yarn prisma migrate dev
docker compose exec backend yarn prisma db seed
```

### Running the project

In order to work on the project, you have to make sure your terminal is in the `backend` folder and run Docker.

```bash
cd backend
docker-compose up
```

Considering that your terminal is in the `frontend` folder, you can run the following command:

```bash
yarn runDocker
```

You can see the app on `http://localhost:3000`

The API should be running on `http://localhost:4000`

### New dependencies

If you want to install new dependencies, you'll have to do it inside the docker container. To do that, you can use the following command:

```bash
cd backend

docker compose exec {backend OR frontend} yarn add {the_name_of_the_package}
```

Make sure to replace the values between the curly braces `{}` with the correct ones.

### API

API documentation can be found on the [API page](docs/api.md).

## General questions

- How much time did you spend working on the solution?

  About 30 hours.

- What’s the part of the solution you are most proud of?

  Using React Context to separate concerns

- If you had more time, what other things you would like to do?

  - Work further on types to remove the @ts-ignore
  - Loading state
  - Install aliases
  - Animations
  - Integration tests
  - Screen reader tests

- Do you have any feedback regarding this coding challenge?

  No.
