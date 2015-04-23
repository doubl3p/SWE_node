/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose     = require('mongoose');

var pokemonSchema = new mongoose.Schema({
    name: { type: String },
    number: { type: Number },
    element: { type: String }
});

// mongoose model exportieren, um es in anderen js files zu verwenden
module.exports = mongoose.model('Pokemon', pokemonSchema);

