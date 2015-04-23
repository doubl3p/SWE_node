/*
CRUD-Methoden
- Zugriff DB
- REST-API
 */

// Einbinden der node.js module
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var pokemon = require('./pokemon');


// Verbinden zur DB
mongoose.connect('mongodb://localhost/REST_API_Project');

// Express-Instanz das modul body parser bekannt machen, um body von POST nach JSON zu parsen
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setzen des Ports für unsere Anwendung
var port = process.env.PORT || 8080;

// CRUD-Methoden mit Pfadangabe
//--------------------------------------------------------

// Router Instanz vom express modul erstellen
var router = express.Router();

// Middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('HTTP-Request geht ein!');
    next(); //dient  dazu den nächsten request zu bedienen und hier nicht zu stoppen
});


// Prefix für PATH
app.use('/REST_API_Project', router);

// POST einer neuen pokemonInstanz
router.route('/pokemons')
    .post(function(req, res) {

        // pokemon Instanz erstellen
        var pokeInstanz = new pokemon();
        pokeInstanz.name = req.body.name;
        pokeInstanz.number = req.body.number;
        pokeInstanz.element = req.body.element;

        // pokemon Instanz erstellen
        pokeInstanz.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Pokemon angelegt!' });
        });

    });

// GET aller pekemons
router.route('/pokemons')
    .get(function(req, res) {
        pokemon.find(function(err, pokemons) {
            if (err)
                res.send(err);

            res.json(pokemons);
        });
    });

// GET für pokemon mit übergebener ID
router.route('/pokemons/:pokemon_id')
    .get(function(req, res) {
        pokemon.findById(req.params.pokemon_id, function(err, pokemon) {
            if (err)
                res.send(err);
            res.json(pokemon);
        });
    });

// UPDATE für pokemon mit übergebener ID
router.route('/pokemons/:pokemon_id')
    .put(function(req, res) {

        // methode findById auf pokemon model aufrufen, um pokemon mit
        // übergebener ID zu finden und anschließend zu updaten.
        pokemon.findById(req.params.pokemon_id, function(err, pokeInstanz) {

            if (err)
                res.send(err);

            pokeInstanz.name = req.body.name;
            pokeInstanz.number = req.body.number;
            pokeInstanz.element = req.body.element;

            // save the bear
            pokeInstanz.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Pokemon upgedated!' });
            });
        });
    });

// DELETE für pokemon mit übergebener ID
router.route('/pokemons/:pokemon_id')

    .delete(function(req, res) {
        pokemon.remove({
            _id: req.params.pokemon_id
        }, function(err, pokeInstanz) {
            if (err)
                res.send(err);
            res.json({ message: 'Pokemon erfolgreich gelöscht' });
        });
    });


// Server starten
// ----------------------------------------------------------------------------
app.listen(port);
console.log('Server erfolgreich auf ' + port + 'gestartet');

