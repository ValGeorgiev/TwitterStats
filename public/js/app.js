
$(document).ready(function(){

    $('#getTwits').on('click', function(){
        $.ajax({
            method: "GET",
            url: 'http://localhost:2016/api/twitts',
            dataType: "xml/html/script/json",
            headers: {
                'Content-Type':'application/json'
            }
        }).always(function(data){
            console.log(data);
        });
    });
    console.log('https://api.twitter.com/1.1/search/tweets.json?q=brexit');
});