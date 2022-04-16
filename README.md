# Installation Instructions - Online Store

## Table of Contents

1. Pull down projects from Github.
2. Test locally.
3. Deploy front-end code.
4. Deploy back-end API code.

## 1. Pull Down Projects from Github.

This project is comprised of a front-end project and a back-end API project which are stored separately in different git repositories. You will need to clone each project.

### Step 1a:

Create two project directories for this project:

`mkdir ~/online-store-react`

`mkdir ~/online-store-nodejs`

### Step 1b:

Clone the front-end code from Github:

`cd ~/online-store-react`

`git clone https://github.com/bentzen-andy/online-store-react.git`

### Step 1c:

Clone the back-end API code from Github:

`cd ~/online-store-nodejs`

`git clone https://github.com/bentzen-andy/online-store-nodejs.git`

## 2. Test the Project Locally.

If you do NOT want to test locally, and only want to deploy this project, feel free to skip this step and move on to step 3.

### Step 2a:

Navigate to the back-end API project:

`cd ~/online-store-nodejs`

Create a `.env` file at the project root. You will need to input the following lines of code:

`PORT=8080`

`MONGO_URI=<your-connection-string-here>` (This project is set up with MongoDB)

`TOKEN_KEY=<...>` Use a large random number (this is used for secure user authentication with JWT tokens).

`CORS_ORIGIN=http://localhost:3000`

`NODE_ENV=development`

### Step 2b:

Start the server:

`npm run dev`

This will spin up the server on port 8080.

### Step 2c:

Next, navigate to the front-end project and start that server as well. You may need to change the of the API calls first.

`cd ~/online-store-react`

### Step 2d:

Search for all the files in the project for the `fetch` function. You will need to comment out the `fetch` calls that call to `https://atb-online-store-api.herokuapp.com/...`, and uncomment the `fetch` calls for `http://localhost:8080/...`

### Step 2e:

Start the server:

`npm start`

This should start up server on port 3000. You will need to be on port 3000 for the website to work properly. If you are on a different port, stop the server and troubleshoot to see if anything else is currently running on this port and close it. You can also optionally update the CORS policy on the back-end API project.

You should now see the homepage of the website running.

## 3. Deploy Front-End Code

### Step 3a:

If you changed the `fetch` calls (per step 2d), you will need to change those back.

### Step 3b:

Choose your host and follow their deployment instructions. If you are deploying this to an Apache server you will need to refer to the documentation for `react-router-dom` to understand the `homepage` option in the `package.json` file.

Depending on your host, you may need to build the project as well:

`npm run build`

This will create the `index.html` file along with all the static files in the `/build` directory of the project root.

## 4. Deploy Back-End Code

### Step 4a:

Prep your environment variables for deployment. Open your `.env` file (found at the root of the project directory), and modify the following variables:

`PORT=8080` (Remove this line if you are deploying to Heroku, otherwise, change this line to `PORT=443`)

`CORS_ORIGIN=https://atb-online-store.herokuapp.com/`

`NODE_ENV=production`

### Step 4b:

Choose your host and follow their deployment instructions. Once you have the project loaded on your server's machine, you can start it with the command:

`npm start`

or equivalently:

`node app.js`
