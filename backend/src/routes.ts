import express from 'express';

import { getAllPolicies, searchPolicies } from './controllers/policies';
import { SEARCH_POLICY_REQUEST_VALIDATOR, validateRequestSchema } from './lib/validator';

const routes = express();

routes.get('/policies', getAllPolicies)
routes.post('/search-policies', SEARCH_POLICY_REQUEST_VALIDATOR, validateRequestSchema, searchPolicies)

routes.get('/', (_, res) => {
    res.send('Server is up and running 🚀')
})

export default routes;

