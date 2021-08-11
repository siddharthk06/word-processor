# WORD PROCESSOR

######_This is a back-end application that receives a URL to process and return the number of word occurrences in its DOM element. It also returns the history of the URL received, to process_

**Dependency**\
Node version:14\
Typecscript: latest version

## Available Scripts

**To run without docker:**

In the project directory,\
To Install the node modules, you can run
### `npm i`
\
To start, you can run
### `npm start`

Runs the app in the development mode.\

List of API:\

To get the number of word occurence sorted by highest count from a URL\. Pass the URL as parameter to test
'GET': http://localhost:4000/wordprocessor?url=<url> \

To get the History
'GET': http://localhost:4000/wordprocessor/history

### `npm test`

Launches the test runner

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!


**To Run using Docker:**

start the docker desktop app

In the project directory you can run
### `docker-compose build`
### `docker-compose up -d`
runs the application in docker.Test the API's mentioned above in the browser
### `docker-compose down`
stops the applciation