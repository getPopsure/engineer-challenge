# Frontend

This is the frontend part of the [Feather Software Engineer code challenge](../Readme.md).

This project has been set up with:

- [Create react app](https://create-react-app.dev)
- [Tailwindcss](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [React Testing Library](https://testing-library.com/)

## Getting started

The easiest way to get started is [using Docker](../Readme.md#Getting-started) with the command below.

```bash
yarn runDcker
```

If you prefer not to use Docker, you can follow the next steps.

Install the dependencies:

```bash
yarn install
```

And run the development server:

```bash
yarn start
```

You're all set! The app should now run in [localhost:3000](http://localhost:3000)

### New dependencies

If you want to install new dependencies, you'll have to do it inside the docker container. To do that, you can use the following command **from the backend folder**:

```bash
docker compose exec {backend OR frontend} yarn add {the_name_of_the_package}
```

Make sure to replace the values between the curly braces `{}` with the correct ones.

## Styles

This project has custom configuration for [Tailwindcss](https://tailwindcss.com/docs/adding-custom-styles). Please check it out before starting and feel free to expand it if necessary: [`tailwind.config.js`](./tailwind.config.js);

Mixins have been added on the [global styles file](./src/styles/index.css).
