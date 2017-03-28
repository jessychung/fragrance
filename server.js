var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.get('/perfume', function (req, res) {


    var customHeaderRequest = request.defaults({
        headers: {'User-Agent': 'test!!'}
    });

    var param = 'female';

    customHeaderRequest(`https://www.fragrantica.com/search/action=general_search&gender%5B%5D=male&year_from=&year_to=2017&countrylist=all&industrieslist=all&sexage=all&sortoption=popularity`, function (error, response, body) {
        $ = cheerio.load(body);
        var test  = $('#rezultati').html();
        res.send(test);
    });


});

app.use(express.static('public'));

app.listen(3000);