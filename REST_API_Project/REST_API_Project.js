/*
CRUD Methoden mit allen relevanten Methoden
 */

    var mongoose = require('mongoose');
    var Pokemon = require('./pokemon');
    // Model aus Schema erstellen

    // Create Funktion zum speichern eines JSON-Datensatz in der DB
    function savePokemon(name, number, element){

        var pokeInstanz = new Pokemon({
          name: name,
          number: number,
          element: element
        });

        pokeInstanz.save(function(err, pokeInstanz) {
          if (err) return console.error(err);
          console.dir(pokeInstanz);
        });
    }

    function findPokemonByName(name){
        var pokeInstanz = Pokemon.findOne({ name: name }, function(err, pokeInstanz) {
        if (err){
            console.error(err);
            return null;
        }
            console.dir(pokeInstanz);
        });
        return pokeInstanz;
    }


    function findPokemonByNumber(number){
        var pokeInstanz = Pokemon.findOne({ number: number }, function(err, pokeInstanz) {
        if (err){
            console.error(err);
            return null;
        }
            console.dir(pokeInstanz);
        });
        return pokeInstanz;
    }

    function findPokemonByElement(element){
        var pokeInstanz = Pokemon.findOne({ element: element }, function(err, pokeInstanz) {
        if (err){
            console.error(err);
            return null;
        }
            console.dir(pokeInstanz);
        });
        return pokeInstanz;
    }

    function deletePokemonByName(name) {
        var pokeInstanz = findPokemonByName(name);
        if (pokeInstanz === null){
            return "Pokemon nicht vorhanden";
        }
        Pokemon.remove(pokeInstanz);
    }

     function deletePokemonByNumber(number) {
        var pokeInstanz = findPokemonByName(number);
        if (pokeInstanz === null){
            return "Pokemon nicht vorhanden";
        }
        Pokemon.remove(pokeInstanz);
    }

    function updatePokemonName(oldName, newName) {
        var pokeInstanz = findPokemonByName(oldName);
        if (pokeInstanz === null){
            return "Pokemon nicht vorhanden";
        }
        Pokemon.update({ name: oldName }, { name: newName });
    }

     function updatePokemonNumber(oldNumber, newNumber) {
        var pokeInstanz = findPokemonByName(oldNumber);
        if (pokeInstanz === null){
            return "Pokemon nicht vorhanden";
        }
        Pokemon.update({ number: oldNumber }, { number: newNumber });
    }

     function updatePokemonElement(oldElement, newElement) {
        var pokeInstanz = findPokemonByName(oldElement);
        if (pokeInstanz === null){
            return "Pokemon nicht vorhanden";
        }
        Pokemon.update({ element: oldElement }, { element: newElement });
    }













