/*

 */

// einbinden der node.js module
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); //Modul einbinden
var pokemon = require('./pokemon');


// Verbinden zur DB
mongoose.connect('mongodb://localhost/REST_API_Project');

// app das modul body parser bekannt machen, um body von POST nach JSON zu parsen
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setzen des Ports für unsere Anwendung

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================

// Router Instanz vom express modul erstellen
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); //dient  dazu den nächsten request zu bedienen und hier nicht zu stoppen
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// Pfad für POST-Request
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

router.route('/pokemons')

    .get(function(req, res) {
        pokemon.find(function(err, pokemons) {
            if (err)
                res.send(err);

            res.json(pokemons);
        });
    });


router.route('/pokemons/:pokemon_id')

    //
    .get(function(req, res) {
        pokemon.findById(req.params.pokemon_id, function(err, pokemon) {
            if (err)
                res.send(err);
            res.json(pokemon);
        });
    });

router.route('/pokemons/:pokemon_id')

   // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
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



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/REST_API_Project', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

