const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('5bab316ce0a7c75f783cb8a8')
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb://admin:admin1234@ac-xeqrfuv-shard-00-00.0lljc5f.mongodb.net:27017,ac-xeqrfuv-shard-00-01.0lljc5f.mongodb.net:27017,ac-xeqrfuv-shard-00-02.0lljc5f.mongodb.net:27017/?ssl=true&retryWrites=true&w=majority&appName=Cluster0&authSource=admin&replicaSet=atlas-sxwo5o-shard-0', {
  useNewUrlParser: true,   // Add this option
  useUnifiedTopology: true // Recommended, explained below
})
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
