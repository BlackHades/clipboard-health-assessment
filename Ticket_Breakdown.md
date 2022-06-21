# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
## Assumptions
1. Database is SQL
2. There are functions to CreateAgent and UpdateAgent

### Ticket 1
Title: Write Test For `CreateAgent` Function and `UpdateAgent` Function
Description: write test cases to handle all use cases of both the `CreateAgent` and `UpdateAgent` Function
Acceptance Criteria: Given i am a developer/DBA, when i run this tests, it should all pass.
Estimated Time: 2 hour

### Ticket 1
Title: Updating Agents Table in the Database
Description: write a migration script to alter the agents table in the database  and create a new column called `externalAgentId` which should be `null` and `unique` by default, this will allow us to have backward compatibility on the table for agents that don't need the column.
Acceptance Criteria: Given i am a developer/DBA, when i check the agents table, Then the `externalAgentId` column should be present and it should be null by default
Estimated Time: 1 hour

### Ticket 2
Title: Refactor the Create Agent Function to allow `externalAgentId`
Description: Refactor the create agent function to allow the new field `externalAgentId`, validate it if it exists by making sure its unique. If it exists and not null in the function parameter then it should be saved with the agents data in the database.
Acceptance Criteria: Given i call the function to create an agent, when i pass the `externalAgentId` as part of the paremeter,  Then the `externalAgentId` should be saved with the other parameter.
Estimated Time: 2 hours

### Ticket 3
Title: Refactor the Update Agent Function to allow `externalAgentId`
Description: Refactor the update agent function to allow the new field `externalAgentId`, validate it if it exists by making sure its unique. If it exists and not null in the function parameter then it should be saved with the agents data in the database.
Implementation Details:
- Function should receive `agentId` and `data` to be updated as the parameter
- Process: get the agent from the database using the `agentId`, if agent doesnt exist return a 404
- validation: if the `data.externalAgentId` != `agent.externalAgentId` && `!agent.externalAgentId`, verify if the `data.externalAgentId` is unique in the database, if its present, return a 429 meaning there is a conflict with a descriptive error message saying that the `externalAgentId` is already binded to another agent.
- Process: MAke an update call to the database to update the `agent` record with the validated content of the `data` variable.
Acceptance Criteria: Given i call the function to update an agent, when i pass the `externalAgentId` as part of the paremeter,  Then the `externalAgentId` should be validated and updated with the other parameter.
Estimated Time: 2 hours

### Ticket 4
Title: Swap `externalAgentId` for the `internal id` during report generation
Description: During report generation, all agents display using the `internal database id` should be swapped with the `externalAgentId`. In a scenerio where `externalAgentId` does not exist, then use the `internal database id`
Acceptance Criteria: Given i am a facility manager, when i generate a report for my facility,  Then i should be able to identify my agents using the `externalAgentId` on the sheet.
Estimated Time: 1 hour


### Ticket 5
Title: Test in `Ticket 1` Should continue to Pass
Description: After working on the follwing ticket `Ticket 1 - Ticket 4`, the test written in `Ticket 1` should still pass to enable us achieve backward compatibility
Acceptance Criteria: Given i am a developer/DBA, when i run this tests, it should all pass.
Estimated Time: 1 hour
