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

                fragranceApp.getWeather(location);

                $.ajax({
                    url: '/perfume',
                    type: 'GET',
                    data: {
                        smell: smell,
                        olfactory: olfactory,
                        age: age
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


        },

        getWeather: function(city){
            var wunderground = `http://api.wunderground.com/api/c674f46e6a835ea2/conditions/q/${city}.json`;
            $.getJSON(wunderground, function (weatherData) {
                console.log(weatherData.current_observation.temp_f);
            });
        },
    };

    fragranceApp.init();


});