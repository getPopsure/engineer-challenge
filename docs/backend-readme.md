# Backend engineer challenge

You need to implement the backend part for the following user story. Please, make sure all of the acceptance criteria are met.

## User story

### As a user, I want to be able to view, create and update the policy data.

- When viewing policies, I want to sort and filter the results.
- When a policy was edited, I want to have access to the previous versions of the policy.
- When editing a policy, I want to be able to add or remove customer's family members.

### Acceptance criteria

- The policies API should support sorting and paginating the results.
- The family members should be stored on a separate table that is linked to the policy.
- It should be possible to find a policy by it's family member names, current or past.
- The policy history should be available at a separate endpoint.
