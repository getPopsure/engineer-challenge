import policy from './policy/policy.routes'
import { Express } from 'express'

export default async (app: Express) => {
  app.use('/policies', policy)
}
