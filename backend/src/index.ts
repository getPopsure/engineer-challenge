import { createApp } from "./api";
import { createApolloServer } from "./apollo";

const port = process.env.PORT || 4000;

async function main() {
  const apolloServer = createApolloServer();
  await apolloServer.start();

  const app = createApp();
  app.use("/api", apolloServer.getMiddleware());

  app.listen(port, () => {
    console.log(`🚀 Server is ready at http://localhost:${port}`);
  });
}

main().catch(console.error);
