// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
let serverInstance: any;
// Get server with async import in order to have env variables available
const getServerInstance = async () => {
  if (!serverInstance) {
    const { server } = await import("./spec/mocks/server.js");
    serverInstance = server;
  }
  return serverInstance;
};
beforeAll(async () => {
  //Setting up environment variables
  process.env = {
    ...process.env,
    REACT_APP_SERVER_BASE_URL: "http://localhost:4000",
  };
  const server = await getServerInstance();
  server.resetHandlers();
  server.listen();
});
beforeEach(() => {});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(async () => {
  const server = await getServerInstance();
  server.resetHandlers();
});
// Clean up after the tests are finished.
afterAll(async () => {
  const server = await getServerInstance();
  server.close();
});

const debounceInmediate = (
  callback: (...callBackargs: any[]) => void,
  wait: number
) => {
  return (...args: []) => {
    callback.apply(null, args);
  };
};

jest.mock("./helpers/utils", () => ({
  ...jest.requireActual("./helpers/utils"),
  debounce: debounceInmediate,
}));
