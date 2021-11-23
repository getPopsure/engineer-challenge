import { customerQueries } from "./customer";



const resolvers = {
  Query: {
    ...customerQueries,
  },
};

export default resolvers;
