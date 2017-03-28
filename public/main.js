$(function () {

    $('#fullpage').fullpage();

    fragranceApp = {};

    fragranceApp.init = function(){
        $('#animal-select').on("change", function(){

            var animalName = $(this).find(':selected').text();
            artApp.updateTitle(animalName);
            artApp.getPieces(animal);
        });
    };



    $('#submit').click(function(){
        var gender = $('input[name=smell]:checked').val();

        $.ajax({
            url: '/perfume',
            type: 'GET',
            success: function(data){
                $('#results').html(data);
            },
            error: function(err){
                alert(err);
            }
        })
    });

});