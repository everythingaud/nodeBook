// Authorization and Passport related routes
const express = require('express');
const router = express.Router();
const { User } = require('./models');
const hashPassword = require('./hashPassword');

// auth is a function that takes passport as an argument
// when called in server.js, auth will run passport and authenticate the user
var auth = (passport) => {

  // warning - empty route
  router.get('/', (req, res) => {
    res.status(500).send("Should be on login page");
  });

  // POST - registration
  // creates and saves user to mongo, redirects to login upon success
  router.post('/register', (req, res) => {
    const password = hashPassword(req.body.password);

    const newUser = new User({
      username: req.body.username,
      password: password,
      fName: req.body.fName,
      lName: req.body.lName
    });

    newUser.save()
      .then(user => {
        res.send({ success: true });
        res.redirect('/login');
      })
      .catch(err => {
        console.log(err);
        res.send("Error registering, please try again");
        res.redirect('/register');
      });
  });

  // POST - login page
  // send back user session id
  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({id: req.session.passport.user });
  });

  // GET - login verification
  // verify that user is logged in, sends back user object
  router.get('/user/logged-in', (req, res) => {
    res.json({ user: req.user });
  });

  // GET - user id
  // sends back user id
  router.get('/userId', (req, res) => {
    res.json({ id: req.session.passport.user });
  });

  // GET - logout
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  return router;
};

// export routes as a function
module.exports = auth;
