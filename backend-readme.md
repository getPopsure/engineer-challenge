# Backend engineer challenge

You need to implement the backend part for the following user story. Please, make sure all of the acceptance criteria are met.

## User story

### As a user, I want to be able to view, create and update the policy data.

[X] When viewing policies, I want to sort and filter the results.
[X] When a policy was edited, I want to have access to the previous versions of the policy.
[X] When editing a policy, I want to be able to add or remove customer's family members.

### Acceptance criteria

[X] The policies API should support sorting and paginating the results. -
[X] The family members should be stored on a separate table that is linked to the policy.
[X] It should be possible to find a policy by it's family member names, current or past. // no history family member history
[X] The policy history should be available at a separate endpoint.

### FR

1. add pagination + sorting = asc desc 2
2. add family members to policy of a customer and create a migration to generate tables
3. create proper indexes for searching
4. migrate old data to new data (family members)
5. add edit events history for auditing

### NFR

1. High Performant search
