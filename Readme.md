# Feather Take Home Assessment

Thank you for applying at Feather and taking the time to do this home assessment.

The goal of this project is to let you show off your coding and problem-solving skills, on a task that resembles the kind of work you’ll be doing with us.

Depending on the position you are applying, you can focus more on the frontend or backend part of the application (or both if you are applying for a fullstack position).

You can spend as little or as much time as you like on this project. We've generated some boilerplate for you to get started.

1. Start by reading the [User story](#User-story) and the [Acceptance criteria](#Acceptance-criteria) have a clear idea of the requirements.
2. Use the [Getting started](#Getting-started) guide to set up a local version of the project on your machine.
3. Take a look at the [Data structure](#Data-structure) and [API](#API) to know what the data looks like.
4. Finish by answering a [couple of questions](#General-questions) about the project. You can answer them on this very same file.

## User story

As a user, I want to be able to search for policies using any of the fields displayed on the table.

When a search filter is applied, I want to see the filtered information on the same table.

When a search filter is applied, I want to be able to clear the current search filter, this action will display the original information.

## Acceptance criteria

- Show only `ACTIVE` and `PENDING` policies.
- Do not display any results if there are no matches
- Clearing the search should return the table to its original state

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
cd backend & docker-compose build & docker-compose up
```

4. Run the seed script to add initial data:

```bash
docker compose exec backend yarn prisma db seed
```

5. That’s it!

You can see the app on `http://localhost:3000`

The API should be running on `http://localhost:4000`

## API

After following the [Getting started](#Getting-started) guide, the backend should be running on port `4000`. The backend currently have one endpoint:

| Request type | Path        | Query Params | Example                   |
| ------------ | ----------- | ------------ | ------------------------- |
| `GET`        | `/policies` | `search`     | `/policies?search=BARMER` |

Feel free to update or add more endpoints to accommodate or improve your solution.

## Data structure

### Policy

| fields         | type                            | comment                                       |
| -------------- | ------------------------------- | --------------------------------------------- |
| id             | string                          | Used to identify the policy                   |
| customer       | [Customer](#Customer)           | Object holding the customer's informations    |
| provider       | string                          | Name of the provider (Allianz, AXA…)          |
| insurance type | [InsuranceType](#InsuranceType) | Type of the insurance (Liability, Household…) |
| status         | [PolicyStatus](#PolicyStatus)   | Status of the insurance (Active, Cancelled)   |
| startDate      | date                            | Date when the policy should start             |
| endDate        | date                            | Date when the policy ends                     |
| createdAt      | date                            | Date when the record was created              |

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
- What’s the part of the solution you are most proud of?

  _You can share a code snippet here if you feel like it_

- If you had more time, what other things you would like to do?
- Is there anything you would like to change in the current setup?
