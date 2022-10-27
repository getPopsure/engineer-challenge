# Feather Take Home Assessment

Thank you for applying at Feather and taking the time to do this home assessment.

The goal of this project is to let you **show off your coding and problem-solving skills**, on a task that resembles the kind of work you’ll be doing with us.

This coding challenge applies to **frontend, backend, and full-stack roles**. Depending on the position you are applying for, you can focus on your specific area.

You can spend as little or as much time as you like on this project. We've added some initial boilerplate to help you get started, but **feel free to refactor every part of this app as you may seem fit**.

1. Start by reading the [Engineering challenge](#Engineering-challenge) for the position you've applied for and don't forget about the **Acceptance criteria** to have a clear idea of the requirements.
2. Use the [Getting started](#Getting-started) guide to set up a local version of the project on your machine.
3. Take a look at the [Data structure](#Data-structure) and [API](#API) to know what the data looks like.
4. Finish by answering a [couple of questions](#General-questions) about the project. You can answer them on this very same file.

## Engineering challenge

We've prepared several different user stories to work on. Depending on what position you applied to, pick one of them:

- [Backend](./backend-readme.md)
- [Frontend](./frontend-readme.md)
- [Full Stack](./full-stack-readme.md)

## Task requirements

- Make sure your feature **works as expected**
- Your code is **easy to understand** and follows best practices
- The project **runs with one command,** and without any external configuration
- **Your code has tests** to make sure the functionalities work as expected

## Getting started

1. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine
2. Set up the environment variables

```bash
cp ./backend/.env.example ./backend/.env
```

3. Build and run the Docker image:

```bash
cd backend
docker-compose build
docker-compose up
```

4. On a new terminal, run the migration and the seed script to add initial data:

```bash
cd backend
docker compose exec backend yarn prisma migrate dev
docker compose exec backend yarn prisma db seed
```

5. That’s it!

You can see the app on `http://localhost:3000`

The API should be running on `http://localhost:4000`

** Note **
If you want to install new dependencies, you'll have to do it inside the docker container. To do that, you can use the following command:

```
docker compose exec {backend OR frontend} yarn add {the_name_of_the_package}
```

Make sure to replace the values between the curly braces `{}` with the correct ones.

## API

After following the [Getting started](#Getting-started) guide, the backend should be running on port `4000`. The backend currently have one endpoint:

| Request type | Path        | Query Params | Example                   |
| ------------ | ----------- | ------------ | ------------------------- |
| `GET`        | `/policies` | `search`     | `/policies?search=BARMER` |

Feel free to update or add more endpoints to accommodate or improve your solution.

## Data structure

### Policy

| fields        | type                            | comment                                       |
| ------------- | ------------------------------- | --------------------------------------------- |
| id            | string                          | Used to identify the policy                   |
| customer      | [Customer](#Customer)           | Object holding the customer's informations    |
| provider      | string                          | Name of the provider (Allianz, AXA…)          |
| insuranceType | [InsuranceType](#InsuranceType) | Type of the insurance (Liability, Household…) |
| status        | [PolicyStatus](#PolicyStatus)   | Status of the insurance (Active, Cancelled)   |
| startDate     | date                            | Date when the policy should start             |
| endDate       | date                            | Date when the policy ends                     |
| createdAt     | date                            | Date when the record was created              |

### Customer

| fields      | type   | comment                       |
| ----------- | ------ | ----------------------------- |
| id          | uuid   | Used to identify the customer |
| firstName   | string | Customer’s first name         |
| lastName    | string | Customer’s last name          |
| dateOfBirth | date   | Customer’s date of birth      |

### InsuranceType

`InsuranceType` can be of `LIABILITY`, `HOUSEHOLD`, `HEALTH`

### PolicyStatus

`PolicyStatus` can be of `ACTIVE`, `PENDING`, `CANCELLED` and `DROPPED_OUT`

## General questions

- How much time did you spend working on the solution?

  Total: About 25 hours

  - First day: 6 hours: Setting up environment, create set of tests, create Table component and types, add ReactQuery, make endpoint call, add cors, add msw to mock endpoint responses, set frontend env variables

  - Second day: 5 hours: Adding filters tests, adding new parameters to endpoint to filter by status and types, searchBox component

  - Third day: 5 hours: Finished filtering tests, added closable behavior, combine parameters to filter

  - Fourth day: 3 hours: Finished pagination tests, implement pagination

  - Fifth day: 3 hours: Refactor table to extract business logic, refactor of some tests

  - Sixth day: 2 hours: Small refactors, writing down decisions in README

- What’s the part of the solution you are most proud of?

  I was able to extract the logic from base components (dynamic cols and rows for the table component), to type the most important data structures, to create a couple of hooks and to add a couple of parameters to the backend endpoint (for types and statuses) that combine with the text search in order to give the results.

- If you had more time, what other things would you like to do?

  - Add some badges to the multi selection dropdown with the selected items to give feedback to the user that is filtering (and unit test for that specific component)
  - When searching for some text then highlight the found text occurences in the filtered table rows
  - Add i18n to the project
  - Review the version of all dependencies and upgrade
  - Add some styles to the error and no data statuses
  - Add sorting to the columns
  - Add alias for paths (like @components etc...)

Do you have any feedback regarding this coding challenge?

- The setup is really nice with everything dockerized in a single project, and I enjoyed and learned a lot while doing it!

Is the initial setup working?, is something missing?, or any other comment

- Just add in the instructions that the command to install new dependencies needs to be executed inside frontend or backend folder

  ```
  cd {backend OR frontend} && docker compose exec {backend OR frontend} yarn add {the_name_of_the_package}
  ```

- Decisions made and why
  - I moved some dependencies to devDependencies in frontend package.json to not be in the final bundle.
  - I added a debounce in text search in order to not overload backend with requests, and mocked that debounce function for the tests (setupTest file).
  - I added react-query that caches the endpoint responses, so once frontend make a request to backend with specific parameters, that request is saved and not repeated again for that session.
  - I added [msw](https://mswjs.io/) mock endpoints library that I think is really interesting (it uses service workers) for integration tests and a way of setup a backend mock layer very fast.
  - Regarding tests and integration: I coded with TDD, so I first wrote the set of tests following the requirements and then the software. I tried to test all the table component behavior inside its [unit](frontend/src/components/Table/index.spec.tsx) tests (pagination and proper render) and then test components interaction (search + table) in the [integration test](frontend/src/spec/integration/PoliciesListPage.spec.tsx). I added a filtering behavior to the server mock, other way of doing it can be by explicit setting the mock response for each test.
  - Backend: I added two new parameters to the GET endpoint, that will be filtering the data in combination with the existing text parameter. Those new parameters can be single values or multiple.
  - I took the decision of pre-filtering by ACTIVE and PENDING policies in the frontend so the user can uncheck them and be able to see other statuses. If this is not desired, the prefilter can be done in the backend and those other values removed from the dropdown easily.
