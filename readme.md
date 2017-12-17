# Ng-Wordy

This application is created for learning pourposes. We decided to create it using MEAN stack.

## Philosophy
Front-end and back-end will be separated. Backend will work as a REST Api, and frontend will be a dynamic web application.

## Git Workflow
Currently we are using the [feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow)

## User Interface
To boost development speed, we decided to use [Clarity UI framework](https://vmware.github.io/clarity/documentation)

## Frontend
In frontend part of this application we use:
- angular
- angular-cli
- redux
- ng2-redux
- typescript
- bootstrap
- rxjs

## Backend
In backend part we use:
- node.js
- express
- mongodb
- typescript

## Typescript
We try to follow this typescript style guide, to maintain clean code:<br>
[Basarat Typescript Style Guide](https://basarat.gitbooks.io/typescript/docs/styleguide/styleguide.html)

## Development
Make sure you have mongoDB instance up and running. It should be run on: mongodb://localhost:27017 or you can set up it in DATABASE_URL env variable.

In order to develop application, one must run "npm start" from 'client' and from 'server' directory.
It will start frontend and backend development servers that talk to each other.

Client will be run on http://localhost:9000
Server will be run on http://localhost:9001
