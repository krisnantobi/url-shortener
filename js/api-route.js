function shortener(url) {
    $.post('https://cleanuri.com/api/v1/shorten', {
        'url': url
    }, function(res){
        console.log("sadsad")
        console.log(res)
    });
    $.ajax({
        type: "GET",
        url: 'https://api.kawalcorona.com/indonesia',
        // dataType:"jsonp",
        success: function(res){
                console.log("sadsad")
                console.log(res)
        }
      });
}