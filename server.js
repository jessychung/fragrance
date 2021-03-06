var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.get('/perfume', function (req, res) {

    var headers = {
        'User-Agent': 'Just doing this for a school project, dont blacklist me :)',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    var options = {
        url: 'https://www.fragrantica.com/ajax.php',
        method: 'POST',
        headers: headers,
        form: {
            action:'general_search',
            gender: [req.query.smell],
            year_from: '',
            year_to: '2017',
            olfactoryGroup: [req.query.olfactory],
            countrylist:'all',
            industrieslist:'all',
            sexage:req.query.age,
            sortoption: req.query.sortoption
        }
    };

    request(options, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            //send stuff back to main.js
            res.send(body)
        }
    });

});

app.use(express.static('public'));

app.listen(3000);