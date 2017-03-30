$(function () {

    var fragranceApp = {

        init : function () {
            $('#fullpage').fullpage();
            $('#goToNext').on('click', function () {
                $.fn.fullpage.setAllowScrolling(true);
            });
            $.fn.fullpage.setAllowScrolling(false);


            $('#submit').click(function(){

                var smell = $('input[name=smell]:checked').val();
                var olfactory = $('input[name=olfactory]:checked').val();
                var age = $('input[name=age]:checked').val();
                var location = $('input[name="location"]').val();
                var sort = 'popularity';

                if(smell == 'female') {
                    $('#showSmell').text('feminine');
                } else if(smell == 'male') {
                    $('#showSmell').text('masculine');
                } else {
                    $('#showSmell').text('uni-sex');
                }

                if(olfactory == 'Floral Fruity') {
                    $('#showOlfactory').text('floral & fruity');
                } else if(olfactory == 'Citrus') {
                    $('#showOlfactory').text('fresh & citrus');
                } else if (olfactory == 'Oriental Spicy') {
                    $('#showOlfactory').text('warm & spicy');
                } else {
                    $('#showOlfactory').text('earthy & woody');
                }

                var wunderground = `http://api.wunderground.com/api/c674f46e6a835ea2/conditions/q/${location}.json`;
                $.getJSON(wunderground, function (weatherData) {
                }).done(function(res) {

                    var temp = res.current_observation.temp_c;
                    console.log(res);

                    if(temp >= 22) {
                        var sort = 'summer';
                        $('#showTemp').text('hot');
                    } else if ( temp < 22 && temp > 15) {
                        var sort = 'spring';
                        $('#showTemp').text('warm');
                    } else if ( temp < 15 && temp > 8) {
                        var sort = 'autumn';
                        $('#showTemp').text('cool');
                    } else {
                        var sort = 'winter';
                        $('#showTemp').text('cold');
                    }

                    $.ajax({
                        url: '/perfume',
                        type: 'GET',
                        data: {
                            smell: smell,
                            olfactory: olfactory,
                            age: age,
                            sortoption: sort
                        },
                        success: function(data){
                            $('#results').html(data);

                            $('#results a').hide();
                            $('#results a:lt(5)').show();
                            $('#results a').removeAttr("href");

                        },
                        error: function(err){
                            console.log(err);
                        }
                    })
                });

            });

        }
    };

    fragranceApp.init();


});