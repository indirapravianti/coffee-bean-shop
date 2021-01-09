const Recipe = require('../models/recipe');

const recipe_index = (req, res) => {
    Recipe.find().sort({createdAt: -1})
        .then((result) => {
            res.render('recipe/index', { 
                title: 'All Recipes', 
                recipes: result
        })
        })
        .catch((err) => {
            res.render('404', {title: '404'});
        })
}

const recipe_details = (req, res) => {
    const id = req.params.id;
  Recipe.findById(id)
    .then((result) => {
      res.render('recipe/details', {recipe: result, title: 'Recipe Details'});
    })
    .catch((err) => {
        res.render('404', {title: '404'});
    })
}

const recipe_create_get = (req, res) => {
    res.render('recipe/create', {title: 'New Recipe'});
}

const recipe_create_post = (req, res) => {
    const recipe = new Recipe(req.body);
    recipe.save()
        .then(() => {
        res.redirect('/recipes');
        })
        .catch((err) => {
            res.render('404', {title: '404'});
        })
}

const recipe_delete = (req, res) => {
    const id = req.params.id;
  Recipe.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/recipes'})
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
    recipe_index, recipe_details, recipe_create_get, recipe_create_post, recipe_delete
}