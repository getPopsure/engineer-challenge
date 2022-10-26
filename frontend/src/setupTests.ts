// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { server } from "./spec/mocks/server.js";

beforeAll(() => {
  server.listen();
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

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
