/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var mongoose = require('mongoose'); //Modul einbinden
var db = mongoose.connection; // Connection aufbauen

db.on('error', console.error);

// Schema erstellen, Model daraus erstellen und via db.once
// dieses DB bekannt machen
db.once('open', function() {
	  // Schema erstellen
      var pokemonSchema = new mongoose.Schema({
	  name: { type: String },
      nummer: { type: Number },
      element: { type: String }
	});

    // Model aus Schema erstellen
	var Pokemon = mongoose.model('Pokemon', pokemonSchema);

    // Instanz erstellen und ich DB speichern
    savePokemon("Kleinstein", 74, "Gestein");

// Create Funktion zum speichern eines JSON-Datensatz in der DB
function savePokemon(name, nummer, element){

    var pokeInstanz = new Pokemon({
	  name: name,
	  nummer: nummer,
	  element: element
	});

	pokeInstanz.save(function(err, pokeInstanz) {
	  if (err) return console.error(err);
	  console.dir(pokeInstanz);
	});
}


});

// Verbinden zur DB
mongoose.connect('mongodb://localhost/test');











