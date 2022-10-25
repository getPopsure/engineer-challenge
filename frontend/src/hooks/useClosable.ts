let closeComponentsFunc: { (): void }[] = [];

const registerAsClosable = (closeFunc: () => void) => {
  closeComponentsFunc.push(closeFunc);
};
const unregisterAllClosable = () => {
  closeComponentsFunc = [];
};
const closeAllClosable = () => {
  closeComponentsFunc.forEach((closeFunc) => {
    closeFunc();
  });
};
export { registerAsClosable, closeAllClosable, unregisterAllClosable };
