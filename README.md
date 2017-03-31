# gelernter-lab
This is a non-hierarchical linear file structure

# How to run the app

1) Navigate into the folder (in the command line/terminal)
2) Run "npm install" to install all required dependencies
3) Run "npm run build" to run the development build script => Keep this process running! It recompiles your files upon changes.
4) Run "npm start" in a new command line/ terminal window => Keep this process running as well, it's your NodeJS server.

# Project Structure (To be revised..)
```
  .
  ├── bower_components          # Client-side packages files
  ├── config                    # Primarily server-side configurations (MongoDb, APIs, etc.)
    ├── env
      ├── development.js        # Info about messages we sent
  ├── modules    
    ├── core                    # Code for the header and landing page resides
      ├── client
        ├── controller     
        ├── views
          ├── server
            ├── home.client.view.html         #
            ├── header.client.view.html
      ├── server
        ├── views
          ├── layout.server.view.html         # Head of the app, how our app connects to the angular app
      ├── tests
    ├── users                   # Code for all other parts of the app resides
      ├── client
        ├── authentication      # Sign up and login pages
        ├── password            # Reset/forgot password
        ├── settings            # Profile settings
      ├── server
        ├── config
          ├── strategies        # Authentication packages behaviors
        ├── routes                      # routing
          ├── core.server.routes.js     #
          ├── user.server.routes.js
      ├── tests
  ├── node_modules             # Node modules files
  ├── public                   # Client-side code
  ├── scripts
  └── README.md
  ```
