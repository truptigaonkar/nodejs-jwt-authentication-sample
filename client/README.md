# React Client for backend

#### Technologies
* Node
* React
* Backend: JSON REST API (https://github.com/auth0-blog/nodejs-jwt-authentication-sample)
* JSON Web Tokens (JWT)
* CSS in JS - Styled Components

#### Installation

Open Server in one terminal
```
  $ git clone git@github.com:truptigaonkar/nodejs-jwt-authentication-sample.git
  $ cd nodejs-jwt-authentication-sample
  $ npm install
  $ node server
```
Open Client in another terminal
``` 
  $ cd client
  $ npm install
  $ npm start
```

### Instructions

* Login with the following existing user:
  ```
    user1: username: 'gonto',password: 'gonto'
    user2: username: 'virat.kohli',password: 'viratkohli'
  ```
* It will take you to protected Home route
* You can access unprotected Home route without login
* Register new user with username and password and login with registered user
