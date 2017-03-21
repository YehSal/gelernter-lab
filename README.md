# gelernter-lab
Make sure you run `npm install` to download the node modules since they're added in the gitignore

# Mlab
To connect using the mongo shell:
mongo ds161049.mlab.com:61049/life_stream -u <dbuser> -p <dbpassword>

To connect using a driver via the standard MongoDB URI:
mongodb://<dbuser>:<dbpassword>@ds161049.mlab.com:61049/life_stream

# Adding Dependencies
1. Install dependency using `bower install`
2. Add dependency in `client/app/config.js`
3. Load the js file from `bower_componenets` in `layout.server.view.html` before `</body>` tag

# Project Structure
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
