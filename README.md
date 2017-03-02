# gelernter-lab
Make sure you run `npm install` to download the node modules since they're added in the gitignore

# Mlab
To connect using the mongo shell:
mongo ds161049.mlab.com:61049/life_stream -u <dbuser> -p <dbpassword>

To connect using a driver via the standard MongoDB URI (what's this?):
mongodb://<dbuser>:<dbpassword>@ds161049.mlab.com:61049/life_stream

# Project Structure

  .
  ├── bower_components          # Client-side packages files
  ├── config                    # Primarily server-side configurations (MongoDb, APIs, etc.)
  ├── modules    
    ├── core                    # Code for the header and landing page resides
      ├── client
      ├── server
      ├── tests
    ├── users                   # Code for all other parts of the app resides
      ├── client
      ├── server
      ├── tests
  ├── node_modules             # Node modules files
  ├── public                   # Client-side code
  ├── scripts
  └── README.md
