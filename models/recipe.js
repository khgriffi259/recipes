let mongoose = require('mongoose');

//recipe Schema

let recipeSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    directions: {
        type: String,
        required: true
    }
});

let Recipe = module.exports = mongoose.model('Recipe', recipeSchema);