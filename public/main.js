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

                var wunderground = `http://api.wunderground.com/api/c674f46e6a835ea2/conditions/q/${location}.json`;
                $.getJSON(wunderground, function (weatherData) {

                }).done(function(res) {

                    if(!$.trim(res)) {
                        console.log('there')
                    } else {
                        var temp = res.current_observation.temp_c;
                    }

                    console.log(res + temp)
                    if(temp >= 22) {
                        var sort = 'summer'
                    } else if ( temp < 22 && temp > 15) {
                        var sort = 'spring'
                    } else if ( temp < 15 && temp > 8) {
                        var sort = 'autumn'
                    } else {
                        var sort = 'winter'
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
                            console.log(sort + temp)

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


        },

        // getWeather: function(city){
        //     var wunderground = `http://api.wunderground.com/api/c674f46e6a835ea2/conditions/q/${city}.json`;
        //     $.getJSON(wunderground, function (weatherData) {
        //         var temp = weatherData.current_observation.temp_f;
        //
        //         if(temp > 25) {
        //
        //         }
        //     });
        // },
    };

    fragranceApp.init();


});