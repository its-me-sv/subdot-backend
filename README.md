# Subdot - Bringing power back to the people

[![wakatime](https://wakatime.com/badge/user/77078a50-96cc-4da2-b32c-08e468259a40/project/59a3cf80-d249-41dd-bcc6-f988e1517d3f.svg)](https://wakatime.com/badge/user/77078a50-96cc-4da2-b32c-08e468259a40/project/59a3cf80-d249-41dd-bcc6-f988e1517d3f)

#### `Note`: This is the back end code of Subdot and the front end code can be found in this repository - https://github.com/its-me-sv/subdot-frontend

## APAC Roadmap: Latest Enhancements in the "APAC Edition"
1. User-to-user communication via chat [implemented]
5. Public sharing of posts [implemented]
2. Advertisement posting dashboard with filtering for adult content [implemented]
4. Extra statistical information on the reputation page [pending implementation]
3. Rewarding top users with fund transfers based on RP score [pending implementation]

Project link - https://subdot.netlify.app

Demo video (APAC edition) - https://youtu.be/JVkSsFW-gHE

Demo video (Europe edition) - https://youtu.be/JVkSsFW-gHE

## Setup:
1. Update the `allowedOrigins` value in the `src/utils/origins.js`
2. Check `MongoDB setup` and `AstrDB (DBaaS for Cassandra)` to setup the databases
### MongoDB setup:
1. Create a `MongoDB` database from https://www.mongodb.com/ with a collection named `Subdot`
2. Create `.env` file in the root directory with variable `MONGO_URL` assigned to the `mongodb uri` which can be found in the `Connect -> Connect your application` section of your mongo db database
3. Make sure to select the `Node.JS` driver with the version `4.1 or later`
### AstrDB (DBaaS for Cassandra) setup:
1. Create a `AstraDB` database from https://astra.datastax.com/ with a keyspace named `subdot`
2. Use the `CQL Console` tab in the AstraDB database that you created to run the `CQL queries`
    1. Switch to `subdot` keyspace using the command `use subdot;`
    2. Run all the queries from the file `src/models/schema.cql`.
3. Head to `Connect` tab in the AstraDB database that you created to connect from our backend
    1. Choose `Drivers` under `Select a Method`
    2. Select `Native` in `Type` under `Drivers` and select `Node.js`
    3. Download the `Secure Connect Bundle` (make sure to choose your region where your database resides)
    4. Place the `Secure Connect Bundle` in the project's root directory (ie. in the same directory where `package.json` resides)
    5. Generate `token` for the database (refer `Get an application token 🔑` from  `Quick Start ⚡` section  )
    6. Save the `token` and fill the `ASTRA_CLIENT_ID`, `ASTRA_SECRET` secrets in the `.env` file
    7. `ASTRA_KEYSPACE` will be the name of the keypsace (subdot in our case)

#### `Note`: Your `.env` file should look something like this. (kindly refer step 2 of `Setup` to fill the secrets)
```
MONGO_URL =
ASTRA_CLIENT_ID = 
ASTRA_SECRET = 
ASTRA_KEYSPACE = 
```

## Usage:
```
npm / yarn install
npm / yarn run dev (in development)
npm / yarn start (in production)
```