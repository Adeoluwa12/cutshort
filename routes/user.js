const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { urlController } = require('../controllers/urlcontroller');
const { handleRegister, handleLogin, handleLogout, handleDashboard } = require('../controllers/usercontroller')




router.get('/register', (req, res) => {
    res.render('register')
});

router.post('/register', handleRegister)



// //login

router.get('/login', (req, res) => {
    res.render('login');
  });
  
  router.post('/login', handleLogin ) 

  
  //login
  
  //logout

  router.get('/logout', (req, res) => {
    res.render('login');
  });
  
  router.post('/logout', handleLogout )


// Dashboard

  router.get('/dashboard', handleDashboard);

  //new

  router.get('/dashboard/new', (req, res) => {
    res.render('new')
  });


  //clicks
  router.get('/dashboard/clicks', urlController.getUrlClicks, (req, res) => {
    res.render('clicks');
  });
  
  router.post('/dashboard/new/shorten', urlController.createShortUrl);
  
  






module.exports = router;