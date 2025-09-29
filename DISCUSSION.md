# Discussion

## First PR - create-and-populate-database

The first step I took was to dockerize the app and include it into the docker-compose.yml.  I did this so I can run the entire application within Docker.  So I created a new Dockerfile for the frontend and then added this to the docker-comose.yml file.

Launching the entire application is now down with:
```bash
docker compose up --build
```
(Note: I am not running in detached mode as I want to see the logs as I'm working.)


Several corrections and addtions needed to be made for the data to be seeded correctly.  I changed the command to run the seed function and installed the tsx package to run this updated command.  The index.ts was not located in the seed directory so I moved that to the proper directory.  And then I updated the index.ts file so that it would actually import all the needed files and run the intsert command to populated the database.

The next step was to create and populate the database, so I ran the following commands (these are done within the Docker environment.)
```bash
docker-compose exec frontend npm run generate
docker-compose exec frontend npm run migrate:up
docker-compose exec frontend npm run seed
```

Now I have a fully populated database.