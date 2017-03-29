$(function () {

    var fragranceApp = {

        init : function () {
            $('#fullpage').fullpage();
            $('#goToNext').on('click', function () {
                $.fn.fullpage.setAllowScrolling(true);
            });
            // $('input[name="smell"]').on('click', function () {
            //     $.fn.fullpage.setAllowScrolling(true);
            // });
            $.fn.fullpage.setAllowScrolling(false);
        },

        getLocation : function(){

            $('form.inputBox').on('click',function(){
                $('div.toolTip').show();
            });

            $('form.inputBox').on('submit', function(e){
                e.preventDefault();
                var location = $(this).find(".inputText").val();
                weatherWidget.getWeather(location);
            });

        },

        getWeather: function(location){
            var weatherLocation = encodeURIComponent(location);
            $.ajax('http://api.wunderground.com/api/c674f46e6a835ea2/conditions/q/'+ weatherLocation + '.json', {
                type : 'GET',
                dataType : 'jsonp',
                success : function(currentData){
                    weatherWidget.parseData(currentData);
                    $.ajax('http://api.wunderground.com/api/c674f46e6a835ea2/forecast/q/'+ weatherLocation + '.json', {
                        type : 'GET',
                        dataType : 'jsonp',
                        success : function(forecastData){
                            weatherWidget.parseForecastData(forecastData);
                            weatherWidget.updateDOM();
                        }
                    });
                }
            });
        },
    };

    fragranceApp.init();


    $('#submit').click(function(){
        var smell = $('input[name=smell]:checked').val();
        var olfactory = $('input[name=olfactory]:checked').val();
        var age = $('input[name=age]:checked').val();

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
            },
            error: function(err){
                console.log(err);
            }
        })
    });

});