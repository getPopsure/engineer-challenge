import express from 'express';
import routes from './routes';

const app = express();
const port = 4000;

app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', ['Content-Type'])
  next();
});
app.use(routes)

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
