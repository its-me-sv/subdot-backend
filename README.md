# Subdot - Bringing power back to the people
[![wakatime](https://wakatime.com/badge/user/77078a50-96cc-4da2-b32c-08e468259a40/project/59a3cf80-d249-41dd-bcc6-f988e1517d3f.svg)](https://wakatime.com/badge/user/77078a50-96cc-4da2-b32c-08e468259a40/project/59a3cf80-d249-41dd-bcc6-f988e1517d3f)
#### `Note:` This is the back end code of Subdot and the front end code can be found in this repository - https://github.com/its-me-sv/subdot-frontend
### Setup:
#### 1. Create a `MongoDB` database from https://www.mongodb.com/ with a collection named `Subdot`
#### 2. Create `.env` file in the root directory with variable `MONGO_URL` assigned to the `mongodb uri` which can be found in the `Connect -> Connect your application` section of your mongo db database. Make sure to select the `Node.JS` driver with the version `4.1 or later`
#### 3. Update the `allowedOrigins` value in the `src/utils/origins.js`
### Usage:
```
npm / yarn install
npm / yarn run dev (in development)
npm / yarn start (in production)
```