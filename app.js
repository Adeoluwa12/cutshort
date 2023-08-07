const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { urlController } = require('./controllers/urlcontroller');
const { userController } = require('./controllers/usercontroller');

const { User } = require('./models/user')
const mainRouter = require('./routes/general');
const signRouter = require('./routes/user')


const app = express();



// Connect to MongoDB
mongoose.connect('mongodb+srv://Adeoluwa123:09014078564Feranmi@cluster0.r8sg61r.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'myappsecret',
    resave: false,
    saveUninitialized: true,
  })
 );






// Routes

app.use('/', mainRouter);
app.use('/start', mainRouter);

app.use('/user', signRouter);


// for dashboard username display
app.get('/user/getUsername', async (req, res) => {
    if (req.session.userId) {
      const user = await User.findOne({ _id: req.session.userId });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      res.status(401).json({ error: 'User not logged in' });
    }
  });
  


  //server
  const PORT = 9000
  app.listen((9000), () => {
      console.log(`YOU ARE LISTENING TO PORT ${PORT}`)
  })





