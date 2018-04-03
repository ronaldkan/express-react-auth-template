const express = require('express');
const path = require('path');
const jsonwebtoken  = require('jsonwebtoken');
const jwt = require('express-jwt');
const generatePassword = require('password-generator');
const config = require('./config');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

app.get('/api/token', (req, res) => {
  const token = jsonwebtoken.sign({
    username: 'user1',
    role: config.role.normal, // default is normal
  }, config.token.secret, { // get secret from config
    expiresIn: config.token.expired // expires in 1 day
  });
  res.json({
    username: 'user1',
    email: 'user1@test.com',
    token: token
  });
});

app.get('/api/test', jwt({secret: config.token.secret}), (req, res)=>{
  res.json({
    result: 'hello'
  });
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);