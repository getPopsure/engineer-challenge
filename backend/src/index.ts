import { port } from "./config/environment";
import app from "./app";


const start = async () => {
  try {
    await app.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  } catch {
    console.log("Not able to run GraphQL server");
  }
};

start();
