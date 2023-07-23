# Subdot - Bringing power back to the people

[![wakatime](https://wakatime.com/badge/user/77078a50-96cc-4da2-b32c-08e468259a40/project/59a3cf80-d249-41dd-bcc6-f988e1517d3f.svg)](https://wakatime.com/@DarkKnight7/projects/nopqgodxqx)

#### `Note`: This is the back end code of Subdot and the front end code can be found in this repository - https://github.com/its-me-sv/subdot-frontend

## APAC Roadmap: Latest Enhancements in the "APAC Edition"
1. User-to-user communication via chat [implemented]
2. Advertisement posting dashboard with scheduling and filtering for adult content [implemented]
3. Extra statistical information on the reputation page [implemented]
4. Public sharing of posts [implemented]
5. Rewarding top users with fund transfers based on RP score [pending implementation]

## Pow
To verify that the code (for `APAC Roadmap`) was written during the `official hack period` (3 to 23 July 2023), kindly check the commit history [here](https://github.com/its-me-sv/subdot-backend/commits/main?after=9035fb04b0021f6d9eb358ac1104b2c184fc98a5+34&branch=main&qualified_name=refs%2Fheads%2Fmain) where there is no commit between `July 5, 2023 (2 days after the APAC opening ceremony)` and `March 17, 2023`. The same goes for the [frontend code](https://github.com/its-me-sv/subdot-frontend/commits/main?after=b869a13c79c753978403420949f2ee6559641cb5+104&branch=main&qualified_name=refs%2Fheads%2Fmain) as well

## Links
Project link - https://subdot.netlify.app

Demo video (APAC edition) - https://youtu.be/xC0IGI8IIyI

Demo video (Europe edition) - https://youtu.be/JVkSsFW-gHE

## Setup:
1. Update the `allowedOrigins` value in the `src/utils/origins.js`
2. Check `MongoDB setup` and `AstrDB (DBaaS for Cassandra)` to setup the databases (for storing stats, advertisements)
3. Chech `GCP Vision AI setup` and `Cloudinary setup` to setup image filtering and storing (for advertisements)
### GCP Vision AI setup:
1. This is used to check for nsfw content in user advertisement image
2. Enable the `Vision AI` API in your `Google Cloud` account
3. Create `Credentials` and download the file to your `root` directory
4. Rename the credentials file to `gcloud-creds.json`
### Cloudinary setup:
1. This is used to store `advertisement images`
2. Create an account in `Cloudinary` from https://cloudinary.com/ and paste the `API credentials` in your `.env` file
### MongoDB setup:
1. This is used for indexing ie. searching of users through `explore` field in `Subdot`
2. Create a `MongoDB` database from https://www.mongodb.com/ with a collection named `Subdot`
3. Create `.env` file in the root directory with variable `MONGO_URL` assigned to the `mongodb uri` which can be found in the `Connect -> Connect your application` section of your mongo db database
4. Make sure to select the `Node.JS` driver with the version `4.1 or later`
### AstrDB (DBaaS for Cassandra) setup:
1. This is used for managing `advertisements` and `user reputation stats`
2. Create a `AstraDB` database from https://astra.datastax.com/ with a keyspace named `subdot`
3. Use the `CQL Console` tab in the AstraDB database that you created to run the `CQL queries`
    1. Switch to `subdot` keyspace using the command `use subdot;`
    2. Run all the queries from the file `src/models/schema.cql`.
4. Head to `Connect` tab in the AstraDB database that you created to connect from our backend
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

CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET = 
CLOUDINARY_PRESET =
```

## Usage:
```
npm / yarn install
npm / yarn run dev (in development)
npm / yarn start (in production)
```