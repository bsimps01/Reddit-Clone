// Require Libraries
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// App Setup
const app = express();

// Use Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// Set db
require('./data/reddit-db');

// Middleware
const exphbs  = require('express-handlebars');

app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
  res.render('home')
})

app.get('/posts/new', (req, res) => {
    res.render('posts-new')
}); 

// Controllers
require('./controllers/posts.js')(app);
//require('./controllers/comments.js')(app);

// Start Server
app.listen(3000, () => {
  console.log('Reddit Clone on port localhost:3000!');
});

module.exports = app;