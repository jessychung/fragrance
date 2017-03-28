var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.get('/perfume/:test', function (req, res) {


    var customHeaderRequest = request.defaults({
        headers: {'User-Agent': 'test!!'}
    });

    var param = 'female';

    var pa = req.params.test;

    customHeaderRequest(`https://www.siteinspire.com/websites?${pa}`, function (error, response, body) {
        $ = cheerio.load(body);
        var test  = $('#rezultati').html();
        res.send(body);
    });


});

app.use(express.static('public'));

app.listen(3000);