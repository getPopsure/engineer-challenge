import express from 'express';
import routes from './routes';

const app = express();
const port = 4000;

app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
