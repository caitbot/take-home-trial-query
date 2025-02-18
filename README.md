## How to run and test
You may run the server with `pnpm api start` and you may run the tests with `pnpm api test`. When running the tests, shut down the server (more on this in notes, you will get a port conflict otherwise).

You may run the cli with `pnpm cli start trials FR` (or replace FR with country code of your choice)

All commands may also be run from their dedicated subdirectories, as described in the original individual README.md, with `pnpm start`.

## Notes from implementing
Below are notes I took while working about various decisions I made and follow-ups I would do.

Break index.ts into app.ts and server.ts, separating out app instantiation and server startup - would allow separation of concerns and ability to start app without server. I did not get around to this and because of that, you cannot run the tests while the server is running due to a port conflict, so it is pretty important.

The trial service currently loads the JSON data on every request - not optimal if this were a huge data file. Potential improvement is storing the data as a class variable. This introduces the risk of stale data if the file changes while the app is running. The ideal solution would be caching or a periodic refresh to keep the data up to date. However, given that this is a mock of an external service, that’s out of scope.

Feature vs functionality based directory structure - initially chose functionality-based (RCSM) due to the project's small size, but switched to feature-based for increased colocation of related feature code.

I duplicated the trials type in the backend and frontend - if this were a bigger project with more shared typings, I would move it to a package shared between the two projects.

All of the provided trials are ongoing based on their dates - I didn’t add data in order to add a test case but if real life, I would have a test case and data to mock this scenario.

I wanted to write tests for the client but ran into a typing issue with jest-mock-fetch. Reached my timebox on debugging and decided to omit.

## Beginning of original problem description and context

As a senior product engineer in the team, you suggested to build an internal tool for our customer success team. You agreed with the product team on the following milestones.

## Step 1: Web API

We first need to be able to query the list of ongoing clinical trials. Two fields are available for queries:
* Sponsor name
* Country code

We already have access to a third-party API (represented by [this file](trials.json)) listing all clinical trials, and we are going to build a wrapper around it.

A trial is _ongoing_ if:

- its start date is in the past
- its end date is in the future
- it has not been canceled

Here is the payload you should obtain when querying ongoing clinical trials for the sponsor "Sanofi":

```json
[
  {
    "name": "Olaparib + Sapacitabine in BRCA Mutant Breast Cancer",
    "start_date": "2019-01-01",
    "end_date": "2025-08-01",
    "sponsor": "Sanofi"
  },
  {
    "name": "Topical Calcipotriene Treatment for Breast Cancer Immunoprevention",
    "start_date": "2018-03-20",
    "end_date": "2032-09-10",
    "sponsor": "Sanofi"
  }
]
```

Example stack: http server exposing REST endpoint that serves json payloads.

## Step 2: Command-line interface

We will then build a command-line interface that displays the list of ongoing clinical trials for a given country code. It will be deployed on the computers of the customer success team. We already have access to a [file](countries.json) that maps country codes to country names. We will leverage what we have already built in the previous step.

Here is the output you should get for the country code "FR":

```txt
Olaparib + Sapacitabine in BRCA Mutant Breast Cancer, France
Topical Calcipotriene Treatment for Breast Cancer Immunoprevention, France
```

# Instructions

- [ ] Clone this repository (do **not** fork it)
- [ ] Implement the features step-by-step (your commit history should be clear to follow)
- [ ] Document your architecture and design choices along the way
- [ ] Provide instructions on how we can run your code
- [ ] Publish it on GitHub (or equivalent)
- [ ] Send us the link and tell us approximately how much time you spent on this assignment

## Guidelines

We expect you to spend no more than 5 hours on this assignment.

To get you started quicker, we setup a typescript monorepo with an API and a CLI. Feel free to use other languages and technologies you are more comfortable with. You are encouraged to make good use of open-source code.

## Expectations
- [ ] You followed the instructions 
- [ ] We can run & query the Web API
- [ ] We can run the CLI
- [ ] We can run tests
- [ ] The applications are bug free

## Out of scope

- Authentication / authorization
- Usage of third party tools, like a CI service
- Performance
- Security

# Setup instructions

In order to setup and run the existing basic project we provided:
- install node (see .nvmrc)
- install and run `pnpm install`
- see the documentation in packages/api and packages/cli