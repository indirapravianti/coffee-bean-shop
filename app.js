const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipeRoutes')

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://indira:swift123@cluster-list-coffee.zrydr.mongodb.net/coffee-recipes?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('connected to db'))
  .catch((err) => console.log(err))

//register view engine
app.set('view engine', 'ejs');

// listen request
app.listen(3000);

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-recipe', (req, res) => {
  const recipe = new Recipe({
    title: 'new recipe again',
    snippet: 'about the recipe',
    steps: 'steps to make'
  });

  recipe.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
})


app.get('/all-recipes', (req, res) => {
  Recipe.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get('/single-recipe', (req, res) => {
  Recipe.findById()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get('/', (req, res) => {
    res.redirect('/recipes');
});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title: 'About'});
});

//recipe routes
app.use('/recipes', recipeRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});