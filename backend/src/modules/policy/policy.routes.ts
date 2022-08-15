import express from 'express'
import controller from './policy.controller'

const router = express.Router()

router.get('/', controller.getAllPolicies) // Search all policies
router.patch('/:id/family-members', controller.modifyFamilyMembers) // Add/remove family members
router.patch('/:id', controller.modifyPolicies) // Edit policy

export default router
