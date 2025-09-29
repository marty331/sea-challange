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

## Second PR - fix-ui-issues

Fix UI related issues - 

app/page.tsx:
- Created Advocate type to prevent errors in the HTML
- Added Advocate type to both useState instances.
- Changed the name of the onChange function to filterData.
- Added const for searchTermElement then checked to see if value exists to prevent null value exception.
- Lowercased the searchTerm and searchable values for better matching.
- Changed the name of the onClick function to resetSearch.
- Added proper tr element to thead to prevent error.
- Added index values to map functions to prevent key error for each row.

app/api/advocates/route.ts
- Corrected import path and removed unneeded import.
- Select data from database and removed hardcoded data selection.

db/index.ts
- Created proper database reference file to be able to query db.

## Third PR - style-ui

Add stying to the app/page.tsx file.  Utilized tailwind to apply stying for the overall page, search section and table section.  Calculate the number of advocates after each filter is applied so the user can quickly see how many they are viewing from the total available.