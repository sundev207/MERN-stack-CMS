MERN-stack-CMS is a free and open-source content management system *(CMS)* based on ReactJS, Node.js, Express and MongoDB.














## Installation

To use MERN-stack-CMS, you must first checkout this repository, or download the .ZIP file and extract its contents, and proceed to the following server and client-side installations:

### Installing back-end with Node.js, Express and MongoDB

The "server" directory contains the source code for your app's backend Express server.<br />
*(You can build your own custom backend server using other programming language if you want.)*

 - First, you must have a `mongod` running version 3.2.x of MongoDB or above.
 - In the "server" directory, run `npm install` to install its dependencies.
 - Open */server/config.js*, read the property descriptions carefully and set them properly according to the configuration of your server.
 - */sites.json* contains your multisite information, modify and import it as your database collection named 'sites' by running: `mongoimport --drop -d reactcms -c sites sites.json`
 - In the "server" directory, run `npm start` or `nodemon` to run the Express app which starts your server.

### Installing front-end React application

The "client" directory contains the source code for your React app.

 - Open */client/src/config.js* and configure it for your app.
 - In the "client" directory, run `npm install` to install its dependencies.
 - In the "client" directory, run `npm start` to start your MERN-stack-CMS app.

### How to register the first administrator?

You need to manually modify the created user's data in the database 'users' collection. Here's a few guide about it:

 - A user data document contains these properties:
~~~~
{
  email: CREATED_USER_EMAIL
  username: CREATED_USER_NAME,
  hash: CREATED_USER_HASH,
  role: 'subscriber',
  ...
}
~~~~
 - You just need to `$set` its role from `'subscriber'` to `'admin'` like the following:
~~~~
{
  email: CREATED_USER_EMAIL
  username: CREATED_USER_NAME,
  hash: CREATED_USER_HASH,
  role: 'admin';
}
~~~~
 - Here are terminal commands that you may need to run if you're hosting your `mongod` on your local server:
~~~~
mongo
use reactcms
db.users.updateOne({ username: 'CREATED_USER_NAME' },{ $set: { role: 'admin' } })
~~~~

That all the things that you need to accomplish, you may now post a new content using your admin account.
